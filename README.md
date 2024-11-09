# web_54-regional

## abbreviation description

### CSS
```css
/*  */ 
#hmb
#hamburger-menu-b
/*  */
#h
#hidden
/*  */
.hmn
.hamburger-menu-navbar
/*  */
.cp
.current-page
/*  */
.btnr
.button-red
/*  */
.btnmg /* mg => mediumseagreen */
.button-green
/*  */
.btng
.button-gray
/*  */
.btny
.button-yellow
/*  */
.btnd
.button-disabled
/*  */
.ff
.form-float
/*  */
#ci
#captcha-image
/*  */
#cc
#captcha-container
/*  */
.prl
.pre-login
/*  */
.pol
.post-login
/*  */
.fv
.first-verification
/*  */
.sv
.second-verification
/*  */
#svg
#second-verification-grid
/*  */
#vos
#visitor-order-section
/*  */
#mls
#visitor-message-list-section
/*  */
#ams
#add-visitor-message-section
/*  */
#ems
#edit-visitor-message-section
/*  */
.bm
.visitor-booking-management
/*  */
.sd
.select-date
/*  */
#cal
#calendar
/*  */
```
### JAVASCRIPT
```javascript
// 
var e;
var event;
// 
var ev;
var event;
// 
var n;
var number;
// 
var c;
var cell;
// 
var cs;
var cells;
// 
var m;
var mode;
// 
var d; // This d is for verification
var dragged;
// 
var d; // This d is for date
var date;
// 
var fd;
var formData;
// 
var ff;
var formFloat;
// 
var r; // This r is for table
var row;
// 
var r;
var reply; // This r is for message
// 
var confr;
var confReply;
// 
var ebtn;
var editButton;
// 
var dbtn;
var deleteButton;
// 
var pbtn;
var pinButton;
// 
var hbtn;
var hiddenButton;
// 
var rbtn;
var replyButton;
// 
var md;
var matchedData;
// 
var confd;
var confiremDelete;
// 
var y;
var year;
// 
var m;
var month;
// 
var sdd;
var selectedDate;
// 
var cal;
var calendar;
// 
var fd;
var firstDay;
// 
var td;
var totalDay;
// 
tgd(hide, show);
toggleDisplay(hideElement, showElement);
// 
rg();
regenerateFirstVerification();
// 
vl(event);
verifyLoginData(event);
// 
gg();
generateGrid();
// 
vsv();
verifySecondVerification();
// 
ci();
clickImage();
// 
cm();
closeModal();
// 
rp();
reduceImageOpacity();
// 
rep();
replyImageOpacity();
// 
ip();
increaseImageOpacity();
// 
gmd();
getVisitorMessageData();
// 
am(event);
addVisitorMessage(event);
// 
cr(table, cs);
createRow(table, cells);
//
emd(c.id);
editVisitorMessageData(cell.id);
//  
em(event);
editVisitorMessage(event);
// 
emdr(md.id);
editVisitorMessageDataReset(matchedData.id);
// 
dm(c.id);
deleteVisitorMessage(cell.id);
// 
pm(c.id);
pinVisitorMessage(cell.id);
// 
unpm(c.id);
unPinVisitorMessage(cell.id);
// 
hm(c.id);
hiddenVisitorMessage(cell.id);
// 
unhm(c.id);
unHideVisitorMessage(cell.id);
// 
rm(c.id);
replyVisitorMessage(cell.id);
// 
gc(y, m)
generateCalendar(currentYear, currentMonth)
// 
```
### PHP
```php
// 
$n;
$number;
// 
$i;
$image;
// 
$b;
$backgroundColor;
// 
$t;
$textColor;
// 
$_SESSION["cn"];
$_SESSION["captchaNumber"];
// 
$r;
$result;
// 
$ra;
$resultAccount;
// 
$rp;
$resultPassword;
// 
$lc;
$lastChars;
// 
eq($conn, $query, $p = []);
executeQuery($connect, $query, $params = []);
// 
ec($conn, $query, $p = []);
executeChange($connect, $query, $params = []);
// 
switch ($_GET["m"]) {}
switch ($_GET["mode"]) {}
// 
case "vl":
case "verifyLoginData":
// 
case "gmd":
case "getVisitorMessageData":
// 
switch ($_POST["m"]) {}
switch ($_POST["mode"]) {}
// 
case "am":
case "addVisitorMessage":
// 
case "em":
case "editVisitorMessage":
// 
case "udm":
case "userDeleteVisitorMessage":
// 
case "dm":
case "deleteVisitorMessage";
// 
```