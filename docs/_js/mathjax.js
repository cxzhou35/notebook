// window.MathJax = {
//   tex2jax: {
//     inlineMath: [ ["\\(","\\)"] ],
//     displayMath: [ ["\\[","\\]"] ]
//   },
//   TeX: {
//     TagSide: "left",
//     TagIndent: ".8em",
//     MultLineWidth: "85%",
//     equationNumbers: {
//       autoNumber: "AMS",
//     },
//     unicode: {
//       fonts: "STIXGeneral,'Arial Unicode MS'"
//     }
//   },
//   displayAlign: "left",
//   showProcessingMessages: false,
//   messageStyle: "none"
// };
window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  }
};

document$.subscribe(() => { 
  MathJax.typesetPromise()
})

