---
title: Skills and Experience
comments: false
date: 2018/4/9
slug: skills
---

Below is an overview of some of the tools and technologies I'm familiar with and a rating between 1 to 5 representing my experience and interest for each. 

| 5 | 4 | 3 | 2 | 1
---|:---:|:---:|:---:|:---:|:---:
Experience | Skilled - I would have no problem using this technology. | | Comfortable - I'm comfortable using this technology but would need to do some research. | | Familiar - I'm familiar with this technology but have not used it extensively.
Interest | Very Interested - I'm very interested in this technology and actively choose to use it. | | I have no strong opinion | | Not Interested - I'm not interested in this technology and would prefer to look for alternatives. 

Bread and Butter | Experience | Interest
 --- |:---:| :---:
 C#                    			| 5 | 5
Javascript        				| 5 | 5
Html &amp; CSS         			| 5 | 5
T-SQL                  			| 5 | 5
.Net Framework         			| 5 | 5
.Net Core              			| 5 | 5 

 Web Applications | Experience | Interest
 --- |:---:| :---:
ASP.Net MVC            			| 5 | 3
ASP.Net WebAPI         			| 5 | 4
ASP.Net Core           			| 4 | 5
Material Design        			| 3 | 3
Bootstrap              			| 4 | 4

Javascript Frameworks and Tools | Experience | Interest
 --- |:---:| :---:
Webpack           				| 4 | 5
Gulp              				| 4 | 3
Sass              				| 4 | 5
NodeJS            				| 3 | 4
Typescript        				| 3 | 5
React             				| 2 | 5
Angular           				| 3 | 2
Knockout          				| 3 | 2

Native Applications | Experience | Interest
 --- |:---:| :---:
UWP Applications 				| 4 | 4 
Xaml / WPF 						| 4 | 2
Xamarin							| 4 | 4 

 Cloud | Experience | Interest
 --- |:---:| :---:
Azure App Services	 			| 5 | 5 
Azure Active Directory 			| 5 | 5
Azure SQL 						| 4 | 5 
Azure Functions 				| 3 | 5
Azure Event Hub        			| 2 | 5
Azure Cognitive Services        | 4 | 5
Azure AI & Machine Learning     | 2 | 5
Cloud Design Patterns 			| 3 | 4

 Frameworks and Tools | Experience | Interest
 --- |:---:| :---:
Entity Framework 				| 3 | 3
Entity Framework Core 			| 5 | 5
Visual Studio 					| 5 | 5
Visual Studio Team Services 	| 5 | 5 
VS Code 						| 4 | 4
Git 							| 5 | 5 
Powershell / Bash Script 		| 3 | 5

 Patterns and Practices | Experience | Interest
 --- |:---:| :---:
Domain Driven Design 			| 4 | 5
Hexagonal Architecture 			| 4 | 5
DI & IoC 						| 5 | 5
Object Oriented Principles      | 5 | 5
Design Patterns 				| 4 | 4
Agile Methodology 				| 4 | 4
Continuous Integration 			| 5 | 5
Automated Deployments 			| 3 | 3
Automated Testing 				| 4 | 4
Specification by Example 		| 2 | 5
Documentation 					| 5 | 5
Aspect Oriented Programming 	| 3 | 5
Identity and Authentication  	| 4 | 5

Other | Experience | Interest
 --- |:---:| :---:
Mentoring Others 				| 5 | 5
Leading Teams 					| 4 | 4
Sql Server 						| 4 | 4
Sql Server Integration Services | 4 | 3
Identity Server 4 				| 3 | 4
Dynamics 365 					| 4 | 4

### Business Domain / Project Experience
- Rostering and scheduling  
- Education and online learning
- Agricultural stock procurement
- Business account and contract management 
- Systems integration


<script> 
document.addEventListener("DOMContentLoaded", function(event) { 

    var cells = document.getElementsByTagName("td");
    var headers = document.getElementsByTagName("th");
    
    ApplyHighlight(headers);
    ApplyHighlight(cells);
});

function ApplyHighlight(cells){ 

    for (var i=0, max=cells.length; i < max; i++) {
        var cell = cells[i];
        var color = null; 
        switch (cell.innerText.trim()) { 
            case "1": color = "#C0D3DC";
            break;
            case "2": color = "#99B7C5";
            break;
            case "3": color = "#7399AA";
            break;
            case "4": color = "#548195";
            break;
            case "5": color = "#3A6C82";
            break;
        }
        if (color) { 
           cell.style.backgroundColor = color;
           cell.style.color = "white";
           cell.style.fontSize = "120%" 
        }
    }
};
</script>