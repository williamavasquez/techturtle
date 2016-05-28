var connection = require('../config/connection.js');

function printQuestionMarks(num){
  var arr = [];

  for (var i=0; i<num; i++){
    arr.push('?')
  }

  return arr.toString();
}

function objToSql(ob){
  //column1=value, column2=value2,...
  var arr = [];

  for (var key in ob) {
    arr.push(key + '= ' + "'" + ob[key] + "'");
  }

  return arr.join(" ");
  // return "productName='asdfasdf'";
  /////// method two: should return "product_name = "asdasdasd"
}

var orm = {
  findOne: function(tableInput, condition, cb) {
      var queryString = 'SELECT * FROM ' + tableInput;
      queryString = queryString + ' WHERE ';
      queryString = queryString + condition;
      console.log(queryString);
      connection.query(queryString, function(err, result) {
          if (err) throw err;
          cb(result);
      });
  },
  createUser: function(table, cols, vals, cb) {
    var queryString = 'INSERT INTO ' + table;

    queryString = queryString + ' (';
    queryString = queryString + cols.toString();
    queryString = queryString + ') ';
    queryString = queryString + 'VALUES (';
    queryString = queryString + printQuestionMarks(vals.length);
    queryString = queryString + ') ';

    console.log(queryString)

    connection.query(queryString, vals, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },

    all: function(tableInput, cb) {
        var queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    //vals is an array of values that we want to save to cols
    //cols are the columns we want to insert the values into
    create: function(table, cols, vals, cb) {
      var queryString = 'INSERT INTO ' + table;

      queryString += ' (productName, productDescription, sku, category, productImage, quantity, price, supplier, barcode) ';
      queryString += 'VALUES';
      queryString += ' (';
      queryString = queryString + printQuestionMarks(vals.length);
      queryString += ') ';

      console.log(queryString)

      connection.query(queryString, vals, function(err, result) {
        if (err) throw err;
        cb(result);
      });
    },

    createCart: function(table, cols, vals, cb) {
      // var queryString = 'INSERT INTO ' + table;

      // queryString += ' (barcode, quantityPurchased) ';

      // queryString += 'VALUES';

      // queryString += ' (';
      // queryString = queryString + printQuestionMarks(vals.length);
      // queryString += ') ';

      // console.log(queryString)

      // connection.query(queryString, vals, function(err, result) {
      //   if (err) throw err;
      //   cb(result);
      // });
    },

    update: function(table, objColVals, condition, cb) {
    var queryString = 'UPDATE ' + table;
    console.log(objToSql(objColVals));
    queryString += ' SET ';
    queryString += objToSql(objColVals).toString();
    queryString += ' WHERE ';
    queryString += condition;

    console.log(queryString)
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  delete: function(table, condition, cb){
    var queryString = 'DELETE FROM ' + table;
    queryString += ' WHERE ';
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  orderCreation: function(table,condition,cb){
  var queryString = 'INSERT INTO ' + table;
  queryString += condition;

  //Creates the order number and associates it the userID
  connection.query(queryString, function(err, result) {
    if (err) throw err;
  });
    cb();
    // this.checkoutOrder()
  },

  checkoutOrder: function(table,condition,cb){
  // //grabs the recent created Order Number for later insert the products
    connection.query('SELECT * FROM ordersGen ORDER BY orderNumber DESC LIMIT 1', function(err, result) {
      if (err) throw err;
      currentOrderNumber = result[0].orderNumber;

    var queryString = 'INSERT INTO ' + table + '(barcode, quantityPurchased, userId, orderNumber) VALUES ('+condition+',' + currentOrderNumber+')'

    connection.query(queryString, function(err, result) {
    if (err) throw err;
    });
  });
    cb();
  },
  confirmationQ : function(table,condition,cb){
    var queryString = 'select * from orders where userId = '+condition;

    connection.query(queryString, function(err,result){
      if (err) throw err;
      cb(result)
    });
  }
};

module.exports = orm;
