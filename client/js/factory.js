// app.factory('myFactory', ['$resource', function($resource) {
//     return $resource( 'http://website.com/api/:apiMethod',
//         { callback: "JSON_CALLBACK", format:'jsonp' }, 
//         { 
//             method1: { 
//                 method: 'JSONP', 
//                 params: { 
//                             apiMethod: 'hello world'
//                         } 
//             }
//     } );
// }]);