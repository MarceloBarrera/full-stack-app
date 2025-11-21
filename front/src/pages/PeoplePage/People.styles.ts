import type { JsxStyleProps } from "@chakra-ui/react";

export const tableStyles: Record<string, JsxStyleProps> = {
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 2px",
  },
  th: {
    px: 6,
    py: 3,
    borderBottom: "1px solid",
    borderColor: "gray.200",
    backgroundColor: "gray.50",
  },
  td: {
    px: 6,
    py: 3,
    borderBottom: "1px solid",
    borderColor: "gray.100",
  },
};
