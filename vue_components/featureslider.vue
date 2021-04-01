<template>
     <div class="block-featured-list swiper-container custom-dots" id="swiperFeatured" r:key="loadingProduct" >
         
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in product" :key="item.ProductID" >
            <product-item :cate="item.Category" :productid="item.ProductID" :name="item.Name" :price="item.Price" :mprice="item.RetailPrice" :img="item.ThumbnailURL"></product-item>
            </div>
        </div>

        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
export default {
    data: {
        product : [],
    },
    methods : {
        
    }
}
</script>