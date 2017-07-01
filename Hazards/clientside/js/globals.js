var self = this;

self.indexImage = ko.observable(true);
self.searchBar = ko.observable(false);
self.header = ko.observable(true);
self.wrap = ko.observable(false);
  
self.loggedin = ko.observable();
self.showLogin = ko.observable(true);
self.showLogout = ko.observable(false);
self.preLogin = ko.observable(false);

self.adminFun = ko.observable(false);
self.hazardMenu = ko.observable(false);
self.hnameValue = ko.observable();
  
self.filename = ko.observable();
self.filenameSelected = ko.observable();
  
self.hname = ko.observable();
self.hnameSelected = ko.observable();

self.markers = ko.observableArray();
self.grabLoc = ko.observable();

self.hazList = ko.observableArray();

self.getDes = ko.observableArray();
self.getMit = ko.observableArray();
self.getSrc = ko.observableArray();
self.zone = ko.observableArray();

self.listHazards = ko.observableArray();
self.chosenItems = ko.observableArray();

self.idhaz = ko.observable();

/*self.uhazValue = ko.observable();
self.udescriptionValue = ko.observable();
self.umitigationValue = ko.observable();
self.usourceValue = ko.observable();
self.dataID = ko.observable();
self.hazID = ko.observable();
self.selectedItem = ko.observable();*/
