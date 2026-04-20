# Cocos Practice Note

## Research

- Animation clip properties
  - Cache mode
  - Layout
- Animation clip methods

## Exercises

### Day 4

#### Cocos Tasks

- [ ] Update exercise 2
- [ ] Create a `character layer` node with a character manager to manage characters;
      apply the same pattern for bullets
- [ ] Use keyboard controls:
  - Arrow keys: move up / down / slight left & right
  - Space: shoot
- [ ] Play shoot animation from gun point toward an enemy
- [ ] Reset to idle after shooting.
- [ ] Implement enemy up/down movement
- [ ] Create multiple collision boxes for the character
- [ ] _(Additional)_ Create multiple bullet types
  - Different image, damage value, and speed per type

#### Notes

- Character architecture: `config` / `controller` / `manager` files
- Research coordinate-space conversion APIs:
  - `convertToWorldSpaceAR`
  - `convertToNodeSpaceAR`
- Enable the collision system in the game's main scene
