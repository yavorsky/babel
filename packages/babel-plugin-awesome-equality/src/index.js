export default () => {
  return {
    name: "is-isnt",
    visitor: {
      BinaryExpression(path) {
        const { node } = path;
        if (!["is", "isnt"].includes(node.operator)) return;
        node.operator = node.operator === "is" ? "===" : "!==";
      },
    },
  };
};
