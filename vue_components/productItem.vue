<template>
    <div class="p-item">
        <a :href="url" class="p-img">
             <img class="lazy" :src="img" :data-src="img" :alt="name">
        </a>
        <div class="p-info">
            <div class="p-info-item">
                <span class="p-cate"> {{categorytitle}} </span>
                <a :href="url" class="p-name">
                    {{name}}
                </a>

                <p class="p-price">
                    {{price}}  <span class="color-bl font-weight-normal">VNĐ</span>
                </p>
            </div>
           

            <div class="p-actions p-info-item">
                
                <div class="p-actions-date p-actions-item">
                    <span class="title">
                        Chọn ngày dự kiến nhập cảnh
                    </span>
                    <div class="picked-value">
                        <input type="text" class="custom-input js-input-date" v-model="ngay_nhap_canh" :id="'product-date-'+productid">
                    </div>
                </div>
                <div class="p-actions-qty p-actions-item">
                    <span class="title">
                        Số lượng khách
                    </span>
                    <div class="picked-value">
                        <div class="p-qty">
                            <span class="input-crement input-number-decrement quantity-change" data-value="-1" v-on:click="decrement()">
                                <svg width="13" height="2" viewBox="0 0 13 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.761841" y="1.19043" width="0.904761" height="11.7619" transform="rotate(-90 0.761841 1.19043)" fill="#3A3A3A"/>
                                </svg>
                            </span>
                            <input class="input-number" type="text" value="01" v-model="qty" min="1" max="5" :id="'product-qty-'+productid" >
                            <span class="input-crement input-number-increment quantity-change" data-value="1" v-on:click="increment()">
                                <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.917847" y="6.35913" width="1.01772" height="10.1772" transform="rotate(-90 0.917847 6.35913)" fill="#3A3A3A"/>
                                    <rect x="6.51495" y="10.9392" width="1.01772" height="10.1772" transform="rotate(180 6.51495 10.9392)" fill="#3A3A3A"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="p-actions-item p-actions-buy">
                    <a href="javascript:void(0);" v-on:click="addToCart(productid, true)" class="btn-custom btn-color">
                        Đặt ngay
                    </a>
                    <a href="javascript:void(0);" v-on:click="addToCart(productid)" class="btn-custom btn-nocolor">
                        Thêm vào giỏ hàng
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
module.exports = {
    props: ["price", "name", "img","mprice" , "productid" , "categorytitle", "url"],
    data() {
        return ({
            qty : 1 ,
            ngay_nhap_canh : '',
        })
    },
    watch: {
      qty: function() {
        if(this.qty < 1) {
          alert('Số lượng không hợp lệ')
          this.qty = 1
        }
      }
    },
    methods : {
        increment : function(){
            this.qty ++;
        },
        decrement : function(){
          this.qty--;
          if(this.qty < 1) {
            alert('Số lượng không hợp lệ')
            this.qty = 1
          }
        },
        getData: function(user) {

            return options = {
                method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': ENV.token
                }
            }
        },
        addToCart: function (id, dat_ngay = false) {
            var io = this
            this.$nextTick(() => {
                var ngay_nhap_canh = $('#product-date-'+ id).val()
                fetch(ENV.BASE_URL+"ajax/cart-add", io.getData({id: id, ngay_nhap_canh: ngay_nhap_canh, quantity: io.qty}))
                    .then(result => result.json())
                    .then(result => {
                        if(dat_ngay) {
                          window.location.href = '/checkout'
                        }else {
                          alert('Thêm giỏ hàng thành công');
                          if(result.data.number > 0) {
                            $('#cart-qty').html(result.data.number)
                          }else {
                            $('#cart-qty').addClass('d-none')
                          }
                        }
                    })
                    .catch(
                        function(error) {
                            console.log('Error: \n', error);
                        }
                    );
            })

        }
    },
    mounted() {
        this.$nextTick(() => {
            $('#product-date-'+ this.productid ).flatpickr({
                dateFormat: "d/m/Y",
              defaultDate: new Date().fp_incr(30),
              minDate:  new Date().fp_incr(30),
            });
            this.ngay_nhap_canh = $('#product-date-'+ this.productid ).val()
        })
    }
}

</script>