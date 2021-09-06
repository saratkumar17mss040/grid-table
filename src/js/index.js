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

$('.product_table_container').hide();

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

// on keypress event on input

$('form').keypress(function (event) {
	return event.keyCode != 13;
});

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
				// currentProduct.parent().hide() not working here
				$($('.product_container .product_text')[i]).parent().hide();
			} else {
				$($('.product_container .product_text')[i]).parent().show();
			}
		}
	} else {
		let products = $('.product_table_container .product_name');
		for (let i = 0; i < products.length; i++) {
			let currentProduct = products[i];
			let currentProductText = currentProduct.textContent.toLowerCase();
			console.log(searchValue, 113);
			console.log(currentProductText, 114);
			if (currentProductText.indexOf(searchValue) === -1) {
				// currentProduct.parent().hide() not working here
				$($('.product_table_container .product_name')[i]).parent().hide();
			} else {
				$($('.product_table_container .product_name')[i]).parent().show();
			}
		}
	}
});

$(function () {

	$('table').tablesorter({
		headers: {
			'.image_head, .description_head': {
				sorter: false,
			},
			1: { sortInitialOrder: 'asc' },
		},
		// third click on the header will reset column to default - unsorted
		sortReset: true,
		// Resets the sort direction so that clicking on an unsorted column will sort in the sortInitialOrder direction.
		sortRestart: true,
		sortInitialOrder: 'asc',
		cancelSelection: true,
		// add tabindex to header for keyboard accessibility
		// the original sort order is maintained
		sortStable: false,
		tabIndex: true,
		ignoreCase: true,
	});
});
