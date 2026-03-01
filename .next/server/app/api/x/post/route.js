/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/x/post/route";
exports.ids = ["app/api/x/post/route"];
exports.modules = {

/***/ "(rsc)/./app/api/x/post/route.js":
/*!*********************************!*\
  !*** ./app/api/x/post/route.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\nasync function POST(request) {\n    const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n    const accessToken = cookieStore.get('x_access_token')?.value;\n    if (!accessToken) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            ok: false,\n            error: 'Not logged in'\n        }, {\n            status: 401\n        });\n    }\n    let body;\n    try {\n        body = await request.json();\n    } catch  {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            ok: false,\n            error: 'Invalid JSON body'\n        }, {\n            status: 400\n        });\n    }\n    const text = typeof body.text === 'string' ? body.text.trim() : '';\n    if (!text) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            ok: false,\n            error: 'text is required'\n        }, {\n            status: 400\n        });\n    }\n    if (text.length > 280) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            ok: false,\n            error: 'text must be 280 chars or less'\n        }, {\n            status: 400\n        });\n    }\n    const postResp = await fetch('https://api.x.com/2/tweets', {\n        method: 'POST',\n        headers: {\n            Authorization: `Bearer ${accessToken}`,\n            'Content-Type': 'application/json'\n        },\n        body: JSON.stringify({\n            text\n        }),\n        cache: 'no-store'\n    });\n    const postJson = await postResp.json();\n    if (!postResp.ok) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            ok: false,\n            step: 'post',\n            status: postResp.status,\n            details: postJson\n        }, {\n            status: 400\n        });\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        ok: true,\n        result: postJson\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3gvcG9zdC9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBMkM7QUFDSjtBQUVoQyxlQUFlRSxLQUFLQyxPQUFPO0lBQ2hDLE1BQU1DLGNBQWMsTUFBTUgscURBQU9BO0lBQ2pDLE1BQU1JLGNBQWNELFlBQVlFLEdBQUcsQ0FBQyxtQkFBbUJDO0lBRXZELElBQUksQ0FBQ0YsYUFBYTtRQUNoQixPQUFPTCxxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDO1lBQUVDLElBQUk7WUFBT0MsT0FBTztRQUFnQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNoRjtJQUVBLElBQUlDO0lBQ0osSUFBSTtRQUNGQSxPQUFPLE1BQU1ULFFBQVFLLElBQUk7SUFDM0IsRUFBRSxPQUFNO1FBQ04sT0FBT1IscURBQVlBLENBQUNRLElBQUksQ0FBQztZQUFFQyxJQUFJO1lBQU9DLE9BQU87UUFBb0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDcEY7SUFFQSxNQUFNRSxPQUFPLE9BQU9ELEtBQUtDLElBQUksS0FBSyxXQUFXRCxLQUFLQyxJQUFJLENBQUNDLElBQUksS0FBSztJQUVoRSxJQUFJLENBQUNELE1BQU07UUFDVCxPQUFPYixxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDO1lBQUVDLElBQUk7WUFBT0MsT0FBTztRQUFtQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNuRjtJQUVBLElBQUlFLEtBQUtFLE1BQU0sR0FBRyxLQUFLO1FBQ3JCLE9BQU9mLHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7WUFBRUMsSUFBSTtZQUFPQyxPQUFPO1FBQWlDLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ2pHO0lBRUEsTUFBTUssV0FBVyxNQUFNQyxNQUFNLDhCQUE4QjtRQUN6REMsUUFBUTtRQUNSQyxTQUFTO1lBQ1BDLGVBQWUsQ0FBQyxPQUFPLEVBQUVmLGFBQWE7WUFDdEMsZ0JBQWdCO1FBQ2xCO1FBQ0FPLE1BQU1TLEtBQUtDLFNBQVMsQ0FBQztZQUFFVDtRQUFLO1FBQzVCVSxPQUFPO0lBQ1Q7SUFFQSxNQUFNQyxXQUFXLE1BQU1SLFNBQVNSLElBQUk7SUFFcEMsSUFBSSxDQUFDUSxTQUFTUCxFQUFFLEVBQUU7UUFDaEIsT0FBT1QscURBQVlBLENBQUNRLElBQUksQ0FDdEI7WUFBRUMsSUFBSTtZQUFPZ0IsTUFBTTtZQUFRZCxRQUFRSyxTQUFTTCxNQUFNO1lBQUVlLFNBQVNGO1FBQVMsR0FDdEU7WUFBRWIsUUFBUTtRQUFJO0lBRWxCO0lBRUEsT0FBT1gscURBQVlBLENBQUNRLElBQUksQ0FBQztRQUFFQyxJQUFJO1FBQU1rQixRQUFRSDtJQUFTO0FBQ3hEIiwic291cmNlcyI6WyIvVXNlcnMvbWEvRG9jdW1lbnRzL2J1dHRlcmZseV90ZWFfcHJvdG90eXBlL2FwcC9hcGkveC9wb3N0L3JvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCB7IGNvb2tpZXMgfSBmcm9tICduZXh0L2hlYWRlcnMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0KSB7XG4gIGNvbnN0IGNvb2tpZVN0b3JlID0gYXdhaXQgY29va2llcygpO1xuICBjb25zdCBhY2Nlc3NUb2tlbiA9IGNvb2tpZVN0b3JlLmdldCgneF9hY2Nlc3NfdG9rZW4nKT8udmFsdWU7XG5cbiAgaWYgKCFhY2Nlc3NUb2tlbikge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG9rOiBmYWxzZSwgZXJyb3I6ICdOb3QgbG9nZ2VkIGluJyB9LCB7IHN0YXR1czogNDAxIH0pO1xuICB9XG5cbiAgbGV0IGJvZHk7XG4gIHRyeSB7XG4gICAgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBvazogZmFsc2UsIGVycm9yOiAnSW52YWxpZCBKU09OIGJvZHknIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gIH1cblxuICBjb25zdCB0ZXh0ID0gdHlwZW9mIGJvZHkudGV4dCA9PT0gJ3N0cmluZycgPyBib2R5LnRleHQudHJpbSgpIDogJyc7XG5cbiAgaWYgKCF0ZXh0KSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgb2s6IGZhbHNlLCBlcnJvcjogJ3RleHQgaXMgcmVxdWlyZWQnIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gIH1cblxuICBpZiAodGV4dC5sZW5ndGggPiAyODApIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBvazogZmFsc2UsIGVycm9yOiAndGV4dCBtdXN0IGJlIDI4MCBjaGFycyBvciBsZXNzJyB9LCB7IHN0YXR1czogNDAwIH0pO1xuICB9XG5cbiAgY29uc3QgcG9zdFJlc3AgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9hcGkueC5jb20vMi90d2VldHMnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2FjY2Vzc1Rva2VufWAsXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB0ZXh0IH0pLFxuICAgIGNhY2hlOiAnbm8tc3RvcmUnLFxuICB9KTtcblxuICBjb25zdCBwb3N0SnNvbiA9IGF3YWl0IHBvc3RSZXNwLmpzb24oKTtcblxuICBpZiAoIXBvc3RSZXNwLm9rKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBvazogZmFsc2UsIHN0ZXA6ICdwb3N0Jywgc3RhdHVzOiBwb3N0UmVzcC5zdGF0dXMsIGRldGFpbHM6IHBvc3RKc29uIH0sXG4gICAgICB7IHN0YXR1czogNDAwIH1cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgb2s6IHRydWUsIHJlc3VsdDogcG9zdEpzb24gfSk7XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiY29va2llcyIsIlBPU1QiLCJyZXF1ZXN0IiwiY29va2llU3RvcmUiLCJhY2Nlc3NUb2tlbiIsImdldCIsInZhbHVlIiwianNvbiIsIm9rIiwiZXJyb3IiLCJzdGF0dXMiLCJib2R5IiwidGV4dCIsInRyaW0iLCJsZW5ndGgiLCJwb3N0UmVzcCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJKU09OIiwic3RyaW5naWZ5IiwiY2FjaGUiLCJwb3N0SnNvbiIsInN0ZXAiLCJkZXRhaWxzIiwicmVzdWx0Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/x/post/route.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fx%2Fpost%2Froute&page=%2Fapi%2Fx%2Fpost%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fx%2Fpost%2Froute.js&appDir=%2FUsers%2Fma%2FDocuments%2Fbutterfly_tea_prototype%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fma%2FDocuments%2Fbutterfly_tea_prototype&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fx%2Fpost%2Froute&page=%2Fapi%2Fx%2Fpost%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fx%2Fpost%2Froute.js&appDir=%2FUsers%2Fma%2FDocuments%2Fbutterfly_tea_prototype%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fma%2FDocuments%2Fbutterfly_tea_prototype&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_ma_Documents_butterfly_tea_prototype_app_api_x_post_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/x/post/route.js */ \"(rsc)/./app/api/x/post/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/x/post/route\",\n        pathname: \"/api/x/post\",\n        filename: \"route\",\n        bundlePath: \"app/api/x/post/route\"\n    },\n    resolvedPagePath: \"/Users/ma/Documents/butterfly_tea_prototype/app/api/x/post/route.js\",\n    nextConfigOutput,\n    userland: _Users_ma_Documents_butterfly_tea_prototype_app_api_x_post_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ4JTJGcG9zdCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGeCUyRnBvc3QlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZ4JTJGcG9zdCUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRm1hJTJGRG9jdW1lbnRzJTJGYnV0dGVyZmx5X3RlYV9wcm90b3R5cGUlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGbWElMkZEb2N1bWVudHMlMkZidXR0ZXJmbHlfdGVhX3Byb3RvdHlwZSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDbUI7QUFDaEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9tYS9Eb2N1bWVudHMvYnV0dGVyZmx5X3RlYV9wcm90b3R5cGUvYXBwL2FwaS94L3Bvc3Qvcm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3gvcG9zdC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3gvcG9zdFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkveC9wb3N0L3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL21hL0RvY3VtZW50cy9idXR0ZXJmbHlfdGVhX3Byb3RvdHlwZS9hcHAvYXBpL3gvcG9zdC9yb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fx%2Fpost%2Froute&page=%2Fapi%2Fx%2Fpost%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fx%2Fpost%2Froute.js&appDir=%2FUsers%2Fma%2FDocuments%2Fbutterfly_tea_prototype%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fma%2FDocuments%2Fbutterfly_tea_prototype&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fx%2Fpost%2Froute&page=%2Fapi%2Fx%2Fpost%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fx%2Fpost%2Froute.js&appDir=%2FUsers%2Fma%2FDocuments%2Fbutterfly_tea_prototype%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fma%2FDocuments%2Fbutterfly_tea_prototype&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();