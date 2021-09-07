async function fetchAllImagesInfo() {
	const mockyURl =
		'http://run.mocky.io/v3/6f7a76ed-d6f5-4b54-be23-bf9a141c982a';

	const mockyData = await fetch(mockyURl)
		.then((res) => res.json())
		.then(async (data1) => {
			let imagesUrl = [];
			let imagePosition = 0;

			for (let { image } of data) {
				imagesUrl.push(image);
			}

			try {
				let actualImagesUrl = await Promise.all(
					imagesUrl.map(async (url) => {
						const res = await fetch(url);
						const data = await res.url;
						// console.log(actualImagesUrl);
						for (let imageData of data1) {
							console.log(imageData);
							imageData.image = actualImagesUrl[imagePosition];
							imagePosition += 1;
						}
						console.log(data1);
						// const productGridContainer = $('.product_grid_container');
						for (let i = 0; i < data1.length; i++) {
							const div = document.createElement('div');
							console.log('cpc');
							const img = document.createElement('img');
							const p1 = document.createElement('p');
							const p2 = document.createElement('p');
							div.className = 'product_container';
							img.src = data1[i].image;
							img.attributes.alt = data1[i].name;
							img.className = 'product_image';
							p1.className = 'product_text';
							p2.className = 'product_description';
							div.appendChild(img);
							div.appendChild(p1);
							div.appendChild(p2);
							console.log(div);
							$('.product_grid_container').appendChild(div);
						}
						// createProductContainersAndAdd(data);
						return data1;
						// return data;
					})
				);
			} catch (error) {
				alert('Error while fetching the actualImagesUrl', error);
			}
			return data;
		})
		.catch((err) => {
			alert('Error while fetching the images info', err);
		});
}

const imagesInfo = fetchAllImagesInfo();

$('.product_table_container').hide();

let currentView = 'grid';

{
	/* <div class="product_container">
	<img class="product_image" src="../flower.jpg" alt="Flower" />
	<p class="product_text">Flower</p>
	<p class="product_description">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad eos
		labore.
	</p>
</div>; */
}

// implement dynamic product_container

// function createProductContainersAndAdd(imagesInfo) {
// 	const productGridContainer = $('.product_grid_container');
// 	for (let i = 0; i < imagesInfo.length; i++) {
// 		const div = document.createElement('div');
// 		console.log('cpc');
// 		const img = document.createElement('img');
// 		const p1 = document.createElement('p');
// 		const p2 = document.createElement('p');
// 		div.className = 'product_container';
// 		img.src = imagesInfo[i].image;
// 		img.attributes.alt = imagesInfo[i].name;
// 		img.className = 'product_image';
// 		p1.className = 'product_text';
// 		p2.className = 'product_description';
// 		div.appendChild(img);
// 		div.appendChild(p1);
// 		div.appendChild(p2);
// 		console.log(div);
// 		$('.product_grid_container').appendChild(div);
// 	}
// }

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

// table sorter configurations

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
