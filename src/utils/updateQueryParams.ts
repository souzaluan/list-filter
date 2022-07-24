function cleanQuery(param: string) {
  const url: any = new URL(window.location.href);

  const params = Array(...url.searchParams.entries()).map((param) =>
    param.join("=")
  );

  const currentFilters = params
    .map((el: any) => {
      if (!el.includes(`${param}=`)) {
        return el;
      }
    })
    .filter(Boolean);

  if (currentFilters.length) {
    window.history.pushState("", "", "?" + currentFilters.join("&"));
  } else {
    const replace = window.location.href
      .replace(window.origin, "")
      .split("?")[0];

    window.history.replaceState("", "", replace);
  }
}

function addQuery(param: string, value: string) {
  if (window.location.href.includes(`${param}=`)) {
    const url: any = new URL(window.location.href);

    const params = Array(...url.searchParams.entries()).map((param) =>
      param.join("=")
    );

    const currentFilters = params.map((el: any) => {
      if (el.includes(`${param}=`)) {
        return `${param}=` + value;
      } else {
        return el;
      }
    });

    window.history.pushState("", "", "?" + currentFilters.join("&"));
  } else {
    window.history.pushState(
      "",
      "",
      "?" + window.location.href.split("?")[1] + "&" + `${param}=` + value
    );
  }
}

export function updateQueryParams(param: string, value?: string) {
  if (!value) {
    if (window.location.href.includes("?")) {
      if (window.location.href.includes(`${param}=`)) {
        cleanQuery(param);
      }
    }
  } else if (window.location.href.includes("?")) {
    addQuery(param, value);
  } else {
    window.history.pushState("", "", `?${param}=` + value);
  }
}
