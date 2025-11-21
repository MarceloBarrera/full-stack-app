export const peopleKeys = {
  all: ["people"] as const,
  detail: (id: string) => [...peopleKeys.all, id] as const,
};
