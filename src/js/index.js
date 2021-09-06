async function fetchAllImagesInfo() {
	const mockyURl =
		'http://run.mocky.io/v3/6f7a76ed-d6f5-4b54-be23-bf9a141c982a';

	// fetch(mockyURl)
	// 	.then((response) => response.json())
	// 	.then((data) => {
	// 		console.log(data);
	// 	}).catch(err => console.log(err));

	// try {
	// 	const data = (async () => {
	// 		const mockyRes = await fetch(mockyURl);
	// 		const data = await mockyRes.json();
	// 		return data;
	// 		console.log(data);
	// 	});
	// }
	// catch (err) {
	// 	alert('Error while fetching the images info', err);
	// }

	const mockyData = await fetch(mockyURl)
		.then((res) => res.json())
		.then((data) => {
			return data;
		})
		.catch((err) => {
			alert('Error while fetching the images info', err);
		});

	let imagesUrl = [];
	let imagePosition = 0;

	for (let { image } of mockyData) {
		imagesUrl.push(image);
	}

	try {
		let actualImagesUrl = await Promise.all(
			imagesUrl.map(async (url) => {
				const res = await fetch(url);
				const data = await res.url;
				return data;
			})
		);
		console.log(actualImagesUrl);
		for (let imageData of mockyData) {
			console.log(imageData);
			imageData.image = actualImagesUrl[imagePosition];
			imagePosition += 1;
		}
		console.log(mockyData);
		return mockyData;
	} catch (error) {
		alert('Error while fetching the actualImagesUrl', err);
	}
}

const imagesInfo = fetchAllImagesInfo();

$('.product_table_container').hide();

// if (localStorage.getItem('currentItem') !== 'table') {
// }

let currentView = 'grid';
// localStorage.setItem('currentView', currentView);

// if (
// 	localStorage.getItem('currentView') === 'grid' ||
// 	!localStorage.getItem('currentView')
// ) {
// 	currentView === 'grid';
// } else {
// 	currentView = 'table';
// }

// let currentView = localStorage.getItem('currentView');

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
	// localStorage.setItem('currentView', currentView);
	// currentView = localStorage.setItem('currentView', 'table');
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
