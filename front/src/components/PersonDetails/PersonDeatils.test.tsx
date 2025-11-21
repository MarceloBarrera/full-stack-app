import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PersonDetails, type PersonDetailsProps } from "./PersonDetails";
import { BrowserRouter } from "react-router-dom";
import type { Person } from "../../api/apis/api";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

const mockPerson = {
  id: "1",
  forename: "John",
  surname: "Doe",
  dob: "1990-01-01",
  ssn: "123456789",
  issuedDateAndTime: new Date().toISOString(),
  friends: [],
  image: "",
  primaryLocation: {
    type: "Point",
    coordinates: [0, 0],
  },
} as Person;

const renderComponent = (props = {}) => {
  const defaultProps = {
    person: mockPerson,
    onSubmit: vi.fn(),
    onCancel: vi.fn(),
    isSubmitButtonEnabled: true,
    shouldManageFriends: false,
  } as PersonDetailsProps;

  return render(
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <PersonDetails {...defaultProps} {...props} />
      </BrowserRouter>
    </ChakraProvider>
  );
};

describe("PersonDetails", () => {
  it("should render all form fields with correct initial values", () => {
    renderComponent();

    expect(screen.getByLabelText(/forename/i)).toHaveValue("John");
    expect(screen.getByLabelText(/surname/i)).toHaveValue("Doe");
    expect(screen.getByLabelText(/date of birth/i)).toHaveValue("1990-01-01");
    expect(screen.getByLabelText(/social security number/i)).toHaveValue(
      "123456789"
    );
  });

  it("should shows validation errors for empty required fields", async () => {
    renderComponent();

    const submitButton = screen.getByText("Save");
    await userEvent.clear(screen.getByLabelText(/forename/i));
    await userEvent.click(submitButton);

    expect(await screen.findByText("This is required")).toBeInTheDocument();
  });

  it("should show validation error for invalid forename format", async () => {
    renderComponent();

    const forenameInput = screen.getByLabelText(/forename/i);
    await userEvent.clear(forenameInput);
    await userEvent.type(forenameInput, "John123");
    await userEvent.click(screen.getByText("Save"));

    expect(await screen.findByText("Only letters allowed")).toBeInTheDocument();
  });

  it("should calls onSubmit with updated person data when form is valid", async () => {
    const onSubmit = vi.fn();
    renderComponent({ onSubmit });

    const forenameInput = screen.getByLabelText(/forename/i);
    await userEvent.clear(forenameInput);
    await userEvent.type(forenameInput, "Jane");
    await userEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        ...mockPerson,
        forename: "Jane",
      });
    });
  });

  it("should call onCancel when close button is clicked", async () => {
    const onCancel = vi.fn();
    renderComponent({ onCancel });

    await userEvent.click(screen.getByText("Close"));
    expect(onCancel).toHaveBeenCalled();
  });

  it("should render friends section when shouldManageFriends is true", () => {
    renderComponent({ shouldManageFriends: true });

    expect(screen.getByText("Total Friends:")).toBeInTheDocument();
    expect(screen.getByText("Manage Friends")).toBeInTheDocument();
  });

  it("should render alert info when shouldManageFriends is false", () => {
    renderComponent({ shouldManageFriends: false });
    expect(
      screen.getByText(
        "You will be able to add friends to this person after it is created."
      )
    ).toBeInTheDocument();
  });

  it("should submit button be disabled when isSubmitButtonEnabled is false", () => {
    renderComponent({ isSubmitButtonEnabled: false });
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });
});
