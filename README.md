# Cocos Practice Note

## Research

- Animation clip properties
  - Cache mode
  - Layout
- Animation clip methods

## Exercises

### Day 4

#### Cocos Tasks

- [x] Add pooling for enemy
- [x] _(Additional)_ Create multiple bullet types
- [x] Create a `character layer` node with a character manager to manage characters;
      apply the same pattern for bullets and enemies
- [x] Play shoot animation from gun point toward an enemy
- [x] Reset to idle after shooting
- [x] Use keyboard controls:
  - Arrow keys: move up / down
  - Space: shoot
- [x] Implement enemy up/down movement
  - Different image, damage value, and speed per type

#### Notes

- Character architecture: `config` / `controller` / `manager` files
- Research coordinate-space conversion APIs:
  - `convertToWorldSpaceAR`
  - `convertToNodeSpaceAR`
- Enable the collision system in the game's main scene
