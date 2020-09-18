$.getJSON('./js/products.json', function (data) {
  // Создание выпадающего списка с категориями из json файла
  data.forEach(key => {
    $('.content__category').append($('<option>', {
      'class': 'category--item',
      value: `${key.name}`,
      text: `${key.name}`
    }))
  });

  //Список товаров категории Смартфоны по умолчанию
  createOptionProduct();
  createModelProduct();

  // Создание списка товаров в зависимости от выбраной категории
  $('.content__category').on('change', function () {
    $('.content__product').remove();
    $('.product').append($('<select>', {
      'class': 'content__product'
    }))
    createOptionProduct();
    createModelProduct();
  })

  // Создание описания товаров в зависимости от выбраного товара
  $('.content__product').on('change', function () {
    createModelProduct();
  })

  $('.add__basket').on('click', function () {
    $('.wrap').css('display', 'flex');
    addBasketProduct();
  })

  //Функция создания выпадающего списка с наименованием товара в зависимости от выбраной категории
  function createOptionProduct() {
    for (let i = 0; i < data.length; i++) {
      if ($('.content__category').val() === data[i].name) {
        data[i].items.forEach(key => {
          $('.content__product').append($('<option>', {
            'class': 'product--item',
            value: `${key.name}`,
            text: `${key.name}`
          }))
        })
      }
    }
  }

  //Функция рендеринга описания товара
  function createModelProduct() {
    data.forEach(key =>
      key.items.forEach(item => {
        if ($('.content__product').val() == item.name) {
          $('p').remove();
          $('span').remove();
          $('img').remove();

          $('.subtitle--text').append($('<p>', {
            'class': 'product--text',
            text: `${ item.desc}`
          }))
          $('.price')
            .append($('<span>', {
              'class': 'price--product',
              text: `${ item.price}`
            }))
            .append($('<span>', {
              'class': 'currency',
              text: 'бел. руб.'
            }));

          $('.img').append($('<img>', {
            'src': `./img/${ item.img}`,
            'alt': `${ item.name}`
          }))
        }

      })
    );
  }

  function addBasketProduct() {
    data.forEach(key =>
      key.items.forEach(item => {
        if ($('.content__product').val() == item.name) {
          $('.basket__product').append($('<li>', {
            'class': 'basket__list'
          }))
          $('.basket__list')
            .append($('<img>', {
              'class': 'product--img',
              'src': `./img/${ item.img}`,
              'alt': `${ item.name}`
            }))
            .append($('<div>', {
              'class': 'product--title',
              text: `${ item.name}`
            }))
            .append($('<div>', {
              'class': 'product--count',
              text: '1'
            }))
            .append($('<div>', {
              'class': 'product--price',
              text: `${ item.price} бел. руб.`
            }))
            .append($('<button>', {
              'class': 'product--clear',
              text: `x`
            }))
        }
      }));
  }

});




// $.getJSON('./js/products.json', function (data) {
//   data.forEach(key => {
//     console.log(key);
//     key.items.forEach(element => {
//       console.log(element);
//       for (let key in element) {
//         console.log(element[key]);
//       }
//     });
//   });
// });
