// assigning to exports will not modify module, must use module.exports
module.exports = (width) => {
  return {
    area: () => width * width,
    perimeter: () => 4 * width
  };
}