let mockyURl = 'http://run.mocky.io/v3/6f7a76ed-d6f5-4b54-be23-bf9a141c982a';
let inGridView = true;

function fetchAllImagesInfo(mockyURl) {
	const loaderImg = document.createElement('img');
	const loaderContainer = $('#loader');
	loaderImg.src = '../src/Hourglass.gif';
	loaderContainer.append(loaderImg);

	return new Promise((resolve, reject) => {
		fetch(mockyURl)
			.then((res) => res.json())
			.then((data) => {
				resolve(data);
			})
			.catch((err) => {
				console.error(('Error while fetching the images info', err));
			})
			.finally(() => {
				loaderImg.remove();
			});
	});
}

fetchAllImagesInfo(mockyURl);

function createProductContainersAndAdd(data) {
	const productGridContainer = $('.product_grid_container');
	for (let i = 0; i < data.length; i++) {
		const productDiv = document.createElement('div');
		const productImg = document.createElement('img');
		const productText = document.createElement('p');
		const productDescription = document.createElement('p');
		productDiv.className = 'product_container';
		productImg.src = data[i].image;
		productImg.attributes.alt = data[i].name;
		productImg.className = 'product_image';
		productText.className = 'product_text';
		productDescription.className = 'product_description';
		productText.innerText = data[i].name;
		productDescription.innerText = data[i].description;
		productDiv.append(productImg);
		productDiv.append(productText);
		productDiv.append(productDescription);
		productGridContainer.append(productDiv);
	}
}

function createTableProductRowAndAdd(data) {
	const productTableContainer = $('table tbody');
	for (let i = 0; i < data.length; i++) {
		const productRow = document.createElement('tr');
		const productImage = document.createElement('img');
		const productTdForImage = document.createElement('td');
		const productName = document.createElement('td');
		const productDescritpion = document.createElement('td');
		productRow.className = 'product_row';
		productImage.src = data[i].image;
		productImage.className = 'product_table_image';
		productImage.attributes.alt = data[i].image;
		productTdForImage.append(productImage);
		productName.className = 'product_name';
		productName.innerText = data[i].name;
		productDescritpion.className = 'product_table_description';
		productDescritpion.innerText = data[i].description;
		productRow.append(productTdForImage);
		productRow.append(productName);
		productRow.append(productDescritpion);
		productTableContainer.append(productRow);
	}
}

$('.product_table_container').hide();

// Toggler - grid / table view

$('.grid_view_option').click(function (e) {
	e.preventDefault();
	inGridView = true;
	$('.grid_view_option').css('text-decoration', 'underline');
	$('.table_view_option').css('text-decoration', 'none');
	$('.product_table_container').hide();
	$('.product_grid_container').show();
});

$('.table_view_option').click(function (e) {
	e.preventDefault();
	fetchAllImagesInfo(mockyURl)
		.then((data) => {
			createTableProductRowAndAdd(data);
			$('table.product_table_container').trigger('update');
		})
		.catch((err) => {
			alert(err);
		});

	inGridView = false;
	$('.table_view_option').css('text-decoration', 'underline');
	$('.grid_view_option').css('text-decoration', 'none');
	$('.product_grid_container').hide();
	$('.product_table_container').show();
});

// on keypress event on input

$('form').keypress(function (event) {
	return event.keyCode != 13;
});

// Search which filters the data

function filterforSearch(searchValue = '', inGridView = false) {
	let productContainer;
	console.log(inGridView);
	if (!inGridView) {
		productContainer = $('.product_table_container .product_name');
	} else {
		productContainer = $('.product_grid_container .product_text');
	}

	for (let i = 0; i < productContainer.length; i++) {
		const currentProduct = productContainer[i];
		const currentProductText = currentProduct.textContent.toLowerCase();
		if (currentProductText.indexOf(searchValue) === -1) {
			$(productContainer[i]).parent().hide();
		} else {
			$(productContainer[i]).parent().show();
		}
	}
}

$('.search_input').on('input', function () {
	const searchValue = $('.search_input').val().toLowerCase();
	filterforSearch(searchValue, inGridView);
});

$(document).ready(function () {
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

// init controller
const gridViewController = new ScrollMagic.Controller();
const tableViewController = new ScrollMagic.Controller();


// build scene
const dynamicProductContentScene = new ScrollMagic.Scene({
	triggerElement: '.dynamic_grid_content .loader',
	triggerHook: 'onEnter',
})
	.addTo(gridViewController)
	.on('enter', function (e) {
		if (!$('#loader').hasClass('active')) {
			$('#loader').addClass('active');
			if (console) {
				fetchAllImagesInfo(mockyURl)
					.then((data) => {
						createProductContainersAndAdd(data);
					})
					.catch((err) => {
						alert(err);
					});
			}
			// "loading" done -> revert to normal state
			dynamicProductContentScene.update();
			// make sure the scene gets the new start position
			$('#loader').removeClass('active');
		}
	});

const dynamicTableProductContentScene = new ScrollMagic.Scene({
	triggerElement: '.dynamic_table_content .loader',
	triggerHook: 'onEnter',
})
	.addTo(tableViewController)
	.on('enter', function (e) {
		if (!$('#loader').hasClass('active')) {
			$('#loader').addClass('active');
			if (console) {
				fetchAllImagesInfo(mockyURl)
					.then((data) => {
						createTableProductRowAndAdd(data);
					})
					.catch((err) => {
						alert(err);
					});
			}
			// "loading" done -> revert to normal state
			dynamicTableProductContentScene.update();
			// make sure the scene gets the new start position
			$('#loader').removeClass('active');
		}
	});
