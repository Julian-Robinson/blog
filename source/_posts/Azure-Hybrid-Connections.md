---
title: Azure Hybrid Connections
tags:
  - Azure
  - WCF
  - Hybrid Connections
Categories:
  - Azure
date: 2017-07-08 00:39:27
---


Currently at work we're building a UWP application that's required to retrieve information from a Dynamics AX 2012 implementation. Not surprisingly the AX server is locked down pretty tightly behind the organisations firewall and only accessible internally. 
We already had a dedicated Web API hosted in Azure for our application and by using **Azure Hybrid Connections** we've been able to to easily allow our Azure API to communicate with the AX WCF Services as if they are within the same network and without unnecessarily exposing the AX web services. 
This post illustrates the setup required to get an Azure Api communicating with a locally hosted WCF Service through a Hybrid Connection.
<!-- More --> 

## Sample Code
To help illustrate the components I've put some code together to represent the components at play. This is available on my GitHub here: [https://github.com/Julian-Robinson/AzureHybridConnectionExample]()

The solution itself contains two projects: 
1. **WCFService** - a dead simple WCF Calculator Service with a couple of methods - *Sum* and *Multiply*. Represents our internal WCF service - not accessible over the internet. 
1. **AzureWebAPI** - an ASP.NET application that references the calculator service. Intended to be hosted in Azure.

{% asset_img "solution.png" "Hybrid Connection Solution" %}

To set these components up with a Hybrid Connection we need to do the following: 
1. Create Azure Api App.
1. Configure the Hybrid Connection Service Endpoint in Azure.
1. Set up WCF Services on local IIS.
1. Configure the Hybrid Connection Manager locally. 

After doing that we'll be able to send *sum* and *multiply* requests like those below to the Web API in Azure which will be routed through to our local WCF Service, calculated and returned. Ground breaking stuff.. 

```
GET http://{azurewebsite}/api/sum/1/2
GET http://{azurewebsite}/api/multiply/2/6
```
> If you run the sample code as is locally you can replace `{azurewebsite}` above with `http://localhost:56894/`

### Create Azure Api App
First up we need an Azure website to host our API. Log into the Azure portal and create a new Web App and App Service. The App Service needs to be at least a basic tier to allow you to apply a Hybrid Connection so they're not available on the free or shared tiers. 

{% asset_img "new-web-app.png" "Creating a new Web App" %}

With the Azure Web App set up we can now associate it with a hybrid connection. 

### Configure the Hybrid Connection Service Endpoint in Azure
1. Open your Web Site in the Azure Portal and select **Networking**. 
1. Select **Configure your hybrid connection endpoints** from the Networking blade. 
{% asset_img "configure-hybrid-connection.png" "configure hybrid connection" %}

1. Select **Add Hybrid Connection**
{% asset_img "add-hybrid-connection.png"  "add hybrid connection"  %}

1. Select **Create New Hybrid Connection**
{% asset_img "create-new-hybrid-connection.png"  "create new hybrid connection"  %}

1. Fill in the details to create a new Hybrid Connection and Service Bus namespace.
    - The hostname must be resolvable from wherever the Hybrid Connection Manager is installed. This could be an internal DNS entry or computer name. In my case it's just my computer name. 
{% asset_img "connection-details.png"  "enter the connection details"  %}

1. Once your Hybrid Connection has been created select it and press **Add selected hybrid connection** to associate it with your web app. 
{% asset_img "associate-connection.png"  "associate your connection with your web app"  %}

That's it for setup on in Azure. Next up we need to configure our local/on-premise machine and set up the Hybrid Connection Manager to communicate with our newly created endpoint.

## Set up WCF Services on local IIS 
> If you're like me and haven't had to use WCF or IIS for a long time then you may need to install IIS and enable WCF Services. Both of these can be installed by searching for **Windows Features** in your start menu. In the Windows Features window select: 
> - Internet Information Services
> - .Net Framework 4.6 Advanced Services > WCF Services > HTTP Activation

For the sake of simplicity I just created a new Web Application **wcftest** under the default web site.
{% asset_img "new-website.png"  "the new wcf service application"  %}
Once that's created I published the **WcfService** project to the directory referenced by this new site. After the deployment browse to your service url (In my case `http://{hostname}/wcftest/CalculatorService.svc`) and check that you're greeted with the standard WCF service page.  
{% asset_img "wcf-service-page.png"  "the standard view of a wcf service endpoint"  %}

This is a good chance to update the WCF connection string in your AzureWebAPI project in Visual Studio. Take the URL of your hosted WCF service and update it the AzureWebAPI's web.config. Run the AzureWebAPI project and confirm that it can connect to your locally hosted WCF service. 
Now that the configuration is complete it's a good opportunity to push your AzureWebAPI app to the Azure web app container you created earlier. Easy to do through Visual Studio's publish mechanism, so do that. 

## Install Hybrid Connection Manager
The Hybrid Connection Manager is used to create the association between your on premise server to the connection in Azure. You can download the installer for the Hybrid Connection Manager from the Hybrid Connections blade in Azure. 
{% asset_img "download-connection-manager.png"  "download the Hybrid Connection Manager here"  %}

Once downloaded run the installer and open the application. 
{% asset_img "hybrid-connection-manager.png"  "the Hybrid Connection Manager"  %}

Hit **Configure another Hybrid Connection** - you'll be prompted for your Azure login. Once authenticated select your subscription and it should load the Hybrid Connection that we created earlier. Select it and press **Save**. Wait a second and it should establish a connection to Azure. 
{% asset_img "connection-success-1.png"  "success!"  %}

Back in the Azure portal you should see that your Hybrid Connection has been picked up and is now being treated as **Connected**. Cool!
{% asset_img "connection-success-2.png"  "more success!"  %}

## Wrapping up

With the Hybrid connection established our Azure website now has a direct connection to our locally hosted web service as if it was within the same network! You can confirm this by sending requests to the Azure Web API and seeing that it returns results from our WCF service. 

```
GET http://{azurewebsite}/api/sum/1/2
GET http://{azurewebsite}/api/multiply/2/6
```
{% asset_img "result.png"  "2 x 6 = 12"  %}

And that's all there is to it. Hybrid connections also work great if you want to access other resources like SQL Databases directly and because the connection is initiated from inside the network the connections are all treated as outbound traffic meaning you're much less likely to have to make changes to your firewall. Check out the [Azure Docs on Hybrid Connections](https://docs.microsoft.com/en-gb/azure/app-service/app-service-hybrid-connections) for more info. 

#### Related Links
[https://docs.microsoft.com/en-gb/azure/app-service/app-service-hybrid-connections](https://docs.microsoft.com/en-gb/azure/app-service/app-service-hybrid-connections)
