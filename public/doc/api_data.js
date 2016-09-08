define({ "api": [
  {
    "type": "get",
    "url": "/api/facilities",
    "title": "Get all available facility types",
    "name": "GetFacilities",
    "group": "Statics",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "test",
            "description": "<p>What is test?</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/statics.js",
    "groupTitle": "Statics",
    "sampleRequest": [
      {
        "url": "https://bootcamp-dev.azurewebsites.net/api/facilities"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/foods",
    "title": "Get all available food types",
    "name": "GetFoods",
    "group": "Statics",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "test",
            "description": "<p>What is test?</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/statics.js",
    "groupTitle": "Statics",
    "sampleRequest": [
      {
        "url": "https://bootcamp-dev.azurewebsites.net/api/foods"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/fuels",
    "title": "Get all available fuel types",
    "name": "GetFuels",
    "group": "Statics",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "test",
            "description": "<p>What is test?</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/statics.js",
    "groupTitle": "Statics",
    "sampleRequest": [
      {
        "url": "https://bootcamp-dev.azurewebsites.net/api/fuels"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/vehicles",
    "title": "Get all available vehicle types",
    "name": "GetVehicles",
    "group": "Statics",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "test",
            "description": "<p>What is test?</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/statics.js",
    "groupTitle": "Statics",
    "sampleRequest": [
      {
        "url": "https://bootcamp-dev.azurewebsites.net/api/vehicles"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/users/:id",
    "title": "Request User information",
    "name": "GetUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of the User.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/sql-helper_test.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://bootcamp-dev.azurewebsites.net/api/users/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/users/:id",
    "title": "Request User information",
    "name": "GetUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of the User.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/stations.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://bootcamp-dev.azurewebsites.net/api/users/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/users/:id",
    "title": "Request User information",
    "name": "GetUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of the User.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/users.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://bootcamp-dev.azurewebsites.net/api/users/:id"
      }
    ]
  }
] });
