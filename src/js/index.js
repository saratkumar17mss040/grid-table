function fetchAllImagesInfo() {
	const imagesInfo = [
		{
			name: 'Flower',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad eos labore.',
			image:
				'https://i.picsum.photos/id/166/670/361.jpg?hmac=dj3Hm3xMENN6lm46go2MBUFN6_YpBAmX40RnVTut7KE',
		},
		{
			name: 'Sea',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad eos labore.',
			image:
				'https://i.picsum.photos/id/305/599/467.jpg?hmac=swl79ssB4no5GnE07hRb9yUO0JoeXJBDtGFfFCVuXBQ',
		},
		{
			name: 'Flower',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad eos labore.',
			image:
				'https://i.picsum.photos/id/166/670/361.jpg?hmac=dj3Hm3xMENN6lm46go2MBUFN6_YpBAmX40RnVTut7KE',
		},
		{
			name: 'Flower',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad eos labore.',
			image:
				'https://i.picsum.photos/id/166/670/361.jpg?hmac=dj3Hm3xMENN6lm46go2MBUFN6_YpBAmX40RnVTut7KE',
		},
		{
			name: 'Flower',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad eos labore.',
			image:
				'https://i.picsum.photos/id/166/670/361.jpg?hmac=dj3Hm3xMENN6lm46go2MBUFN6_YpBAmX40RnVTut7KE',
		},
		{
			name: 'Flower',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad eos labore.',
			image:
				'https://i.picsum.photos/id/166/670/361.jpg?hmac=dj3Hm3xMENN6lm46go2MBUFN6_YpBAmX40RnVTut7KE',
		},
		{
			name: 'Flower',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad eos labore.',
			image:
				'https://i.picsum.photos/id/166/670/361.jpg?hmac=dj3Hm3xMENN6lm46go2MBUFN6_YpBAmX40RnVTut7KE',
		},
		{
			name: 'Flower',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad eos labore.',
			image:
				'https://i.picsum.photos/id/166/670/361.jpg?hmac=dj3Hm3xMENN6lm46go2MBUFN6_YpBAmX40RnVTut7KE',
		},
		{
			name: 'Flower',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad eos labore.',
			image:
				'https://i.picsum.photos/id/166/670/361.jpg?hmac=dj3Hm3xMENN6lm46go2MBUFN6_YpBAmX40RnVTut7KE',
		},
		{
			name: 'Flower',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad eos labore.',
			image:
				'https://i.picsum.photos/id/166/670/361.jpg?hmac=dj3Hm3xMENN6lm46go2MBUFN6_YpBAmX40RnVTut7KE',
		},
	];
	return imagesInfo;
}

let currentView = 'grid';

// implement toggler - grid / table view

$('.grid_view_option').click(function (e) {
	e.preventDefault();
	currentView = 'grid';
	$('.grid_view_option').css('text-decoration', 'underline');
	$('.table_view_option').css('text-decoration', 'none');
	$('.product_table_container').hide();
	$('.product_grid_container').show();
});

$('.table_view_option').click(function (e) {
	e.preventDefault();
	currentView = 'table';
	$('.table_view_option').css('text-decoration', 'underline');
	$('.grid_view_option').css('text-decoration', 'none');
	$('.product_grid_container').hide();
	$('.product_table_container').show();
});

// console.log($($('.product_container .product_text')[0]).parent().hide());

// console.log(($('.product_container .product_text')[0].parent()));

// implement search which filters the data

$('.search_input').on('input', function () {
	let searchValue = $('.search_input').val().toLowerCase();
	if (currentView === 'grid') {
		let products = $('.product_container .product_text');
		for (let i = 0; i < products.length; i++) {
			let currentProduct = products[i];
			let currentProductText = currentProduct.textContent.toLowerCase();
			console.log(searchValue, 113);
			console.log(currentProductText, 114);
			if (currentProductText.indexOf(searchValue) === -1) {
				$($('.product_container .product_text')[i]).parent().hide();
			} else {
				$($('.product_container .product_text')[i]).parent().show();
			}
		}
    }
});

//  // find all the divs with product_container
//         let productContainers = $('.product_container');
//             // loop through all the divs
//         for (let i = 0; i < productContainers.length; i++) {
//             // select the product_text - p
//             let currentProductContainer = productContainers[i];
//             let currentProductText = productContainers[i];
//         }
//                     // compare the text with search_Value
//                     // if it matches
//                         // do nothing
//                     // else
//                         // remove the current product_container
