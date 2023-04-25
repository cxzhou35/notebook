const updateScheme = e => {
    var giscus = document.querySelector(".giscus-frame");
    var a = localStorage.getItem('data-md-color-scheme');
    var theme = a === "default" ? "light" : "dark";
    // alert(a + " -> " + theme);
    giscus.contentWindow.postMessage(
        { giscus: { setConfig: { theme } } },
        "https://giscus.app"
    )
}

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
