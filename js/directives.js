angular.module("search.widget", [])
.directive('searchWidget', [ function searchWidget()
{
	return {
		restrict: 'E',
		replace: true,
		scope: {
			settings: '=',
		},
		controller: function($scope)
		{
			$scope.getNavUrl = function() {
				return window.location.search.replace("?", "");
			};
			
			$scope.getParameters = function(url) {
				var params = {};
				url = url.split('&');
				var length = url.length;
				for(var i=0; i<length; i++) {
					var prop = url[i].slice(0, url[i].search('='));
					var value = url[i].slice(url[i].search('=')).replace('=', '');
					params[prop] = decodeURIComponent(value);
				}
				return params;
			};
			
			$.ajax({
				url: $scope.settings.api,
				type: $scope.settings.apiMethodType,
				data: {"query": $scope.getParameters($scope.getNavUrl())[$scope.settings.paramName]},
				success: function(results)
				{
					$scope.$apply(function(){
					   $scope.search = {};
					   $scope.search.searchResults = results;
					   $scope.search.searchResults.querySearchItem = '\"'+$scope.search.searchResults.querySearchItem+'\"';
					});
				}
			});
		},
		template : '<span>\
			<div class="box-header well">\
				<h2><i class="glyphicon glyphicon-search"></i> Search results found for <span ng-bind="search.searchResults.querySearchItem"</h2>\
			</div>\
			<div class="box-content">\
				<div class="search-container ">\
					<div class="search-container" ng-if="search.searchResults.results.length==0">\
						<div class="search-item clearfix">\
							<div class="search-content text-left">\
								<h3 class="search-title" style="text-align:center;">\
									<div class="no-results-title no-results-sub">Sorry, no results found!</div>\
								</h3>\
								<p class="search-desc">\
									<h4 class="search-title" style="text-align:center;">\
									<div class="no-results-check">Please check the spelling or try searching for something else</div>\
								</h4>\
								</p>\
							</div>\
						</div>\
					</div>\
					<div class="search-container" ng-if="search.searchResults.results.length>0">\
						<div class="search-item clearfix" ng-repeat="results in search.searchResults.results">\
							<div class="search-content text-left">\
								<h4 class="search-title">\
									<a href="javascript:;"><span ng-bind="results.title"></span></a>\
								</h4>\
								<p class="search-desc">\
									<span ng-bind="results.content"></span>\
								</p>\
							</div>\
							<hr>\
						</div>\
					</div>\
					<div class="search-pagination" ng-if="search.searchResults.results.length>0">\
						<ul class="pagination">\
							<li class="page-active">\
								<a href="javascript:;"> 1 </a>\
							</li>\
							<li>\
								<a href="javascript:;"> 2 </a>\
							</li>\
							<li>\
								<a href="javascript:;"> 3 </a>\
							</li>\
							<li>\
								<a href="javascript:;"> 4 </a>\
							</li>\
						</ul>\
					</div>\
				</div>\
			</div>\
		</span>'
	};
}]);