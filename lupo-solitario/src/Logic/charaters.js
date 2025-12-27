export function eatMeal() {
  setCharacterSheet((prev) => {
    if (prev.meals <= 0) return prev; // No meals left
    if (prev.ep >= prev.epMax) return prev; // EP already full

    return {
      ...prev,
      meals: prev.meals - 1,
      ep: prev.epMax,
    };
  });
}
