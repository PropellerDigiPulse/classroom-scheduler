// postcss-gap-fallback.cjs
module.exports = () => {
  return {
    postcssPlugin: 'postcss-gap-fallback',
    Once(root) {
      root.walkRules(rule => {
        let gapValue, rowGapValue, colGapValue;

        rule.walkDecls(/^gap$/, decl => {
          gapValue = decl.value;
          decl.remove();
        });

        rule.walkDecls(/^row-gap$/, decl => {
          rowGapValue = decl.value;
          decl.remove();
        });

        rule.walkDecls(/^column-gap$/, decl => {
          colGapValue = decl.value;
          decl.remove();
        });

        if (gapValue || rowGapValue || colGapValue) {
          const rowGap = rowGapValue || gapValue || '0';
          const colGap = colGapValue || gapValue || '0';

          // Apply margin fallback for flex layouts
          rule.after(
            postcss.rule({
              selector: `${rule.selector} > *:not(:last-child)`
            }).append({ prop: 'margin-right', value: colGap })
          );
          rule.after(
            postcss.rule({
              selector: `${rule.selector} > *:not(:last-child)`
            }).append({ prop: 'margin-bottom', value: rowGap })
          );
        }
      });
    }
  };
};
module.exports.postcss = true;
