// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place. 

/***********
INSTRUCTIONS:
  - Select the project you would 
    like to complete from the dropdown 
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank 
    pen.
  - Click the "TESTS" button to see 
    the individual test cases. 
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments. 
let w = 600;
let h = 300;
let dataset = [1,2,6,8]
let svg = d3.select("body")
            .append("svg")
            .attr("width",w)
            .attr("height",h);
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("width", 50)
   .attr("height", d => d * 15)
   .attr("x",(d, i) => i * 53)
   .attr("y",d => h - d * 15)
   .attr("fill","#000");
    
