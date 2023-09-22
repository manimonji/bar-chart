let w = 700;
let h = 460;

let padding = 40;

fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
  .then(response => response.json())
  .then(data => {
    let dataset = data.data;

    let GDPScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, d => d[1])])
                     .range([h - padding, padding]);

    let dateScale = d3.scaleTime()
                       .domain([d3.min(dataset, d => new Date(d[0])), d3.max(dataset, d => new Date(d[0]))])
                       .range([0,w]);
    
    let GDPAxis = d3.axisLeft(GDPScale);
    let dateAxis = d3.axisBottom(dateScale);

    let svg = d3.select("body")
                .append("svg")
                .attr("width",w)
                .attr("height",h);
    svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      // .attr("width", w / dataset.length)
      .attr("width", (d,i) => i + 1 < dataset.length ? dateScale(new Date(dataset[i+1][0])) - dateScale(new Date(d[0])) : w)
      .attr("height", d => (GDPScale(d[1]) - h + padding) * -1)
      // .attr("x",(d, i) => i * w / dataset.length + padding)
      .attr("x", d => dateScale(new Date(d[0])) + padding)
      .attr("y",d => h - ((GDPScale(d[1]) - h) * -1) - padding )
      .attr("fill","#000")
      .attr("class", "bar")
      .attr("data-gdp",d => d[1])
      .attr("data-date",d => d[0])
      .on("mouseenter", (e) => {
        let target = d3.select(e.target);
        let date = new Date(target.attr("data-date"));
        let dateString = date.toLocaleString('default', { month: 'long' }) + " " + date.getDay() + " , "+ date.getFullYear();

        d3.select("#tooltip")
          .style("display","block")
          .style("transform", `translate(${dateScale(date) + 400}px, 0)`)
          .attr("data-date", target.attr("data-date"));

        d3.select("#tooltip > .gdp")
          .text(target.attr("data-gdp"));
        d3.select("#tooltip > .date")
          .text(dateString);
      })
      .on("mouseleave", () => {
        d3.select("#tooltip").style("display","none");
      });
    svg.append("g")
       .attr("id", "y-axis")
       .attr("transform",`translate(${padding}, ${-padding})`)
       .call(GDPAxis);
    svg.append("g")
       .attr("id", "x-axis")
       .attr("transform",`translate(${padding}, ${h - (padding * 2)})`)
       .call(dateAxis);
  });