jQuery(function ($) {
          $("#wrapper-response").bind("DOMNodeInserted",function(){
            if($("#wrapper-response").find('#shipping-rates').length == 0)
              return false;
            var shopCurrency = 'USD';
            // Main Currency
            var shippingValueTotal = 0;
            // Default value Shipping
            var defaultCurrencySign = '';
            // sign of the a currencies
            var curstr = $('#grandtotal .money').attr("data-currency-"+shopCurrency.toLowerCase());
            for (var i = 0; i < curstr.length; i++) {
              if(Number.isInteger(parseInt(curstr.charAt(i)))) {
                break;
              }
              defaultCurrencySign += curstr.charAt(i);
            }
            //check shipping TAX
            if($("#wrapper-response #shipping-rates .money").length >= 1) {
              if($("#wrapper-response #shipping-rates .money").length > 1) {
                var str = "Two Variants";
                if(str == "") {
                  $("#tax").hide();
                  return false;
                }
                $("#tax .money").text(str);
                $("#tax").show();
                return false;
              }
              var content = $("#wrapper-response .money").clone();
              $("#tax .money").replaceWith(content);
              $("#tax").show();
              var shippingValueTotal = parseFloat($("#wrapper-response .money").text().replace(/[^0-9\.]/g,''));
              //get Tax price
            }
            else {
              $("#tax").hide();
            }
            //get Tax price
            var tofindpoint = $('#subtotal .money').attr("data-currency-"+shopCurrency.toLowerCase()).replace(/[^0-9\.]/g,'');
            var defaultValueSubtotal = parseFloat(tofindpoint);
            //full price
            var grandtotal = defaultValueSubtotal + shippingValueTotal;
            //format to this 1,000,000.00 or 1,000,000
            grandtotal = format(grandtotal, tofindpoint);
            //for #grandtotal element
            var dataCurrencyDefault = defaultCurrencySign+grandtotal;
            //create full price with shipping
            jQuery('#grandtotal .money').replaceWith('<span class="money" data-currency-'+shopCurrency.toLowerCase()+'="'+dataCurrencyDefault+'">'+dataCurrencyDefault+'</span>');
            $('.currency .active').trigger('click');
            function format(n, k) {
              var sum = '';
              var group1 = 1000000000;
              var group2 = 1000000;
              var group3 = 1000;
              var sep = ".";
              // Default to period as decimal separator
              var decimals = 2;
              // Default to 2 decimals
              var isDecimal = k.toString(10).indexOf(".")==-1;
              var num = Math.floor(n);
              var x = Math.floor(num / group1);
              if(x > 0) {
                x = decimalWithZero(sum, x);
                sum = x + ",";
                num -= x * group1;
              }
              x = Math.floor(num / group2);
              if(x > 0 || sum != '') {
                x = decimalWithZero(sum, x);
                sum += x + ",";
                num -= x * group2;
              }
              x = Math.floor(num / group3);
              if(x > 0 || sum != '') {
                x = decimalWithZero(sum, x);
                sum += x + ",";
                num -= x * group3;
              }
              x = decimalWithZero(sum, num);
              sum += x;
              n = n.toFixed(decimals).split(sep)[1];
              if(isDecimal) {
                return sum;
              }
              else {
                return sum + sep + n;
              }
            }
            function decimalWithZero(sum, x) {
              if(sum != ''){
                var y = '000' + x;
                y = y.substr(y.length - 3);
                return y;
              }
              return x;
            }
          }
                                     );
          $("input").change(function(){
            $("#update-cart").addClass("blink-border");
          }
                           );
          $("textarea").change(function(){
            $("#update-cart").addClass("blink-border");
          }
                              );
          $(".shopping-cart-table__input input").change(function(){
            var current = Number($(this).val());
            var max = $(this).attr("max");
            if(current > max) {
              $(this).val(max);
            }
          }
                                                       )
        }
              );