const PI = Math.PI;
exports.area = (r) => PI * r * r;
exports.circumference = (r) => 2 * PI * r;

var add =(function () {
    var counter =0;
    return function () {
        return counter+=1;
    }
})();

add();
add();
add();