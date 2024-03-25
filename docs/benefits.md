# SPA

## SPA over traditional multi-page application

A single-page application is an app that is presented to the user through a single HTML page. Presentation logic is rendered on the client-side. The single webpage is downloaded once only from the server, then the same page is updated with new data in response to user interaction. The app does not require the page to be reloaded during use.

A multi-page application is an app that is made up of many pages. As the user interacts with the site, new pages are downloaded from the server.

### Advantages of using SPA over MPA

1. SPAs generally have faster loading speeds than MPAs. This is an important factor to consider as slow load times will increase the number of users leaving your website. The amount of data that travels between the client and the server after initial page load is also very small, so will not ngatively impact user experience.
2. User experience is smoother on an SPA because user interacting with the website does not trigger full page loads. Instead, the content is dynamically updated without the need to fetch and render new HTML pages. The increased responsive user experience will encourage uses to use the DFCorp app and users will be more inclined to return.
3. The frontend and backend for an SPA is more loosely coupled compared to an MPA. This makes the site easier to develop, easier to test, and easier to maintain. In the long run, this could mean avoiding high development and maintainence costs.

### Disdvantages of using SPA over MPA

1. MPAs are more suitable for larger apps, such as e-commerce websites. On larger apps, prealoading everthing for an SPA could take too long, so MPAs can have a faster initial loading time in these circumstances. If users are waiting too long for the initial page to load up, they could very easily click off.
2. MPAs are more suitable for use with Google Analytics. This is important for obtaining valuable information about visitors coming to the website. This data can be used to analyse which pages perform the best, and would be useful for mkaing improvements to the app.
3. MPAs are SEO friendly. This is because each page can be optimised for particular search terms and patterns, allowing better targeting and funnelling of traffic to your website.

## SPA over traditional server-side rendered application

A server-side rendered application is an app where the server generates the HTML of a web page before it is sent to the user's browser

### Advantages of using SPA over SSR

1. SPA is generally cheaper to maintain and run. SSR can get complex and expensive to maintain and is more prone to errors. To run SSR, DFCorp wil also need its own server to install an SSR applications, which will increase the running costs.
2. SPAs perform better when it comes to user interactivity, as page content is dynamically updated without full page reloads. This is especially helpful for sites that require smooth transitions or real-time updates as the client side can seamlessly handle such interactions. This will improve user experience on your site, help to keep traffic on your site instead of away from it.

### Disadvantages of using SPA over SSR

1. SSR applications perform better in terms of SEO because the HTML is generated on the server, which makes it easier for search engine crawlers to index. Better SEO will affect the number of people being about to find tyour website, which will help guid traffic towards your app.
2. SSR often have faster initial loads times compared to SPAs because pre-rendered HTML is sent to the client. SSR will also update the parts of the HTML that need updating. This means that even users with a slow internet connection or outdated devices can immediately interact with your webpages. Not only does the speed improve user experience and keep users on your site, but it also allows a wider range of users to interact with your site. The increased traffic will give DFCorp a boost.

### Conclusion

In conclusion, since DFCorp are focusing on a social media app Chitter, rather than a larger e-commerce website, DFCorp should use an SPA. For a socail networking site, SEO matters less, but speed will matter to the users who are on the app and are focused on Peeps loading and smooth user interactivity.
