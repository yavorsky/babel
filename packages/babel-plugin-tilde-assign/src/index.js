export default function(babel) {
  const { types: t } = babel;
  return {
    name: "tilde-assign", // not required
    visitor: {
      BinaryExpression(path) {
        const { scope, node } = path;
        window.path = path;
        if (node.operator !== "~>") return;
        const { right, left } = node;
        const placeholder = scope.generateUidIdentifierBasedOnNode(left);
        const objectExpression = t.objectExpression([
          t.spreadElement(t.identifier(placeholder.name)),
          t.spreadElement(right),
        ]);
        scope.push({ id: placeholder });
        path.replaceWith(
          t.sequenceExpression([
            t.assignmentExpression("=", placeholder, left),
            objectExpression,
          ]),
        );
      },
    },
  };
}
