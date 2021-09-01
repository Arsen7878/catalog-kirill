let ssdCar = '';
let vehicleidCar = '';
let catalogCar = '';

function getPostOem() {
  const request = new XMLHttpRequest();
  request.open('POST', 'https://autodoka-srv.com/Meric/hs/tecdoc/oem/');
  request.responseType = 'json';

  let art = '252122F310';

  let bodyS = {
    vendor_code: art,
    search_type: '10',
  };

  const body = JSON.stringify(bodyS);

  request.setRequestHeader('Content-Type', 'application/json');

  request.setRequestHeader('Token', 'sAnWaCmRqtrdEySnoXA6l5tFpP7qmETl');

  request.onload = function () {
    console.log(request.response);
  };

  request.send(body);
}

function getPostVin(vin) {
  const request = new XMLHttpRequest();
  request.open('POST', 'https://autodoka-srv.com/Meric/hs/tecdoc/vin/');
  request.responseType = 'json';

  //   let vin = 'WAUZZZ4BZ1N046686';

  let bodyS = {
    vin,
  };

  const body = JSON.stringify(bodyS);

  request.setRequestHeader('Content-Type', 'application/json');

  request.setRequestHeader('Token', 'sAnWaCmRqtrdEySnoXA6l5tFpP7qmETl');

  request.onload = function () {
    carlist(request.response.data);
  };

  request.send(body);
}

function getPostGos(searchQuery) {
  const request = new XMLHttpRequest();
  request.open('POST', 'https://autodoka-srv.com/Meric/hs/tecdoc/gos/');
  request.responseType = 'json';

  let bodyS = {
    gos: searchQuery,
  };

  const body = JSON.stringify(bodyS);

  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Token', 'sAnWaCmRqtrdEySnoXA6l5tFpP7qmETl');
  request.onload = function () {
    console.log(request.response);
    getPostVin(request.response.data);
  };

  request.send(body);
}

function getPostTree(ssd, carid, code) {
  const request = new XMLHttpRequest();
  request.open('POST', 'https://autodoka-srv.com/Meric/hs/tecdoc/tree/');
  request.responseType = 'json';

  let bodyS = {
    ssd,
    carid,
    code,
  };

  const body = JSON.stringify(bodyS);

  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Token', 'sAnWaCmRqtrdEySnoXA6l5tFpP7qmETl');
  request.onload = function () {
    passengerTree(request.response.data.general);
  };

  request.send(body);
}

function passengerTree(tree) {
  treeRef.insertAdjacentHTML('beforeend', `<ul class ="tree-list"></ul>`);

  // console.log(tree);
  tree.map((obj, index) => {
    // ! ================================== уровень 1
    const name = obj.name;
    const quickGroupId = obj.quickgroupid;
    const searchable = obj.searchable;
    const groups = obj.detailGroups;
    let showhide = '';

    if (groups.length > 0) {
      showhide = 'hide';
    } else {
      showhide = 'none';
    }

    const treeListRef = document.querySelector('.tree-list');
    treeListRef.insertAdjacentHTML(
      'beforeend',
      `<li class ="tree-list-item"  data-name="${name}" data-id = "${quickGroupId}"  data-link ="${searchable}"><span class="${showhide}">${name}</span></li>`
    );

    if (groups.length > 0) {
      const liRef = treeListRef.querySelector(`[data-id = "${quickGroupId}" ]`);
      liRef.insertAdjacentHTML(
        'beforeend',
        `<ul hidden class ="tree-first"></ul>`
      );

      groups.map((group1) => {
        // ! ================================== уровень 2
        const name1 = group1.name;
        const quickGroupId1 = group1.quickgroupid;
        const searchable1 = group1.searchable;
        const groups1 = group1.detailGroups;
        let showhide1 = '';

        if (groups1.length > 0) {
          showhide1 = 'hide';
        } else {
          showhide1 = 'none';
        }

        const treeSecond = liRef.querySelector('.tree-first');
        treeSecond.insertAdjacentHTML(
          'beforeend',
          `<li data-name="${name1}"  data-id="${quickGroupId1}" data-link = "${searchable1}"><span class="${showhide1}">${name1}</span></li>`
        );
        if (groups1.length > 0) {
          const liRef = treeListRef.querySelector(
            `[data-id = "${quickGroupId1}" ]`
          );
          liRef.insertAdjacentHTML(
            'beforeend',
            `<ul hidden class ="tree-first"></ul>`
          );

          groups1.map((group2) => {
            // ! ================================== уровень 3
            const name2 = group2.name;
            const quickGroupId2 = group2.quickgroupid;
            const searchable2 = group2.searchable;
            const groups2 = group2.detailGroups;
            let showhide2 = '';

            if (groups2.length > 0) {
              showhide2 = 'hide';
            } else {
              showhide2 = 'none';
            }

            const treeSecond = liRef.querySelector('.tree-first');
            treeSecond.insertAdjacentHTML(
              'beforeend',
              `<li data-name="${name2}"  data-id="${quickGroupId2}" data-link = "${searchable2}"><span class="${showhide2}">${name2}</span></li>`
            );

            if (groups2.length > 0) {
              const liRef = treeListRef.querySelector(
                `[data-id = "${quickGroupId2}" ]`
              );
              liRef.insertAdjacentHTML(
                'beforeend',
                `<ul  hidden class ="tree-second"></ul>`
              );

              groups2.map((group3) => {
                // ! ================================== уровень 4
                const name3 = group3.name;
                const quickGroupId3 = group3.quickgroupid;
                const searchable3 = group3.searchable;
                const groups3 = group3.detailGroups;
                let showhide3 = '';

                if (groups3.length > 0) {
                  showhide3 = 'hide';
                } else {
                  showhide3 = 'none';
                }

                const treeSecond = liRef.querySelector('.tree-second');
                treeSecond.insertAdjacentHTML(
                  'beforeend',
                  `<li data-name="${name3}"  data-id="${quickGroupId3}" data-link = "${searchable3}"><span class="${showhide3}">${name3}</span></li>`
                );

                if (groups3.length > 0) {
                  const liRef = treeListRef.querySelector(
                    `[data-id = "${quickGroupId3}" ]`
                  );
                  liRef.insertAdjacentHTML(
                    'beforeend',
                    `<ul hidden class ="tree-third"></ul>`
                  );

                  groups3.map((group4) => {
                    // ! ================================== уровень 5
                    console.log(group4);
                    const name4 = group4.name;
                    const quickGroupId4 = group4.quickgroupid;
                    const searchable4 = group4.searchable;
                    const groups4 = group4.detailGroups;
                    let showhide4 = '';

                    if (groups4.length > 0) {
                      showhide4 = 'hide';
                    } else {
                      showhide4 = 'none';
                    }

                    const treeSecond = liRef.querySelector('.tree-third');
                    treeSecond.insertAdjacentHTML(
                      'beforeend',
                      `<li data-name="${name4}"   data-id="${quickGroupId4}" data-link = "${searchable4}"><span class="${showhide4}">${name4}</span></li>`
                    );
                  });
                }
              });
            }
          });
        }
      });
    }
  });
}

function onSearch(element) {
  element.preventDefault();

  // const searchQuery = element.currentTarget.elements.query.value;
  // const searchQuery = 'ав6083ср';
  const searchQuery = 'WVWZZZ1JZYD150112';

  if (searchQuery === '') {
    alert('Петушинное гнездо, шо ты вводишь?');
  } else {
    if (searchQuery.length <= 8) {
      getPostGos(searchQuery);
    } else {
      getPostVin(searchQuery);
    }
  }
}

function carlist(datacar) {
  if (datacar.length > 0) {
    const dataCarString = datacar[0];
    const brand = dataCarString.brand;
    const name = dataCarString.name;

    catalogCar = dataCarString.catalog;
    ssdCar = dataCarString.ssd;
    vehicleidCar = dataCarString.vehicleid;

    const keys = Object.keys(dataCarString);
    const values = Object.values(dataCarString);

    listRef.insertAdjacentHTML(
      'beforeend',
      `<tbody><tr data-table__data><td>Марка</td><td>${brand}</td></tr></tbody>`
    );

    listRef.insertAdjacentHTML(
      'beforeend',
      `<tbody><tr data-table__data><td>Модель</td><td>${name}</td></tr></tbody>`
    );

    let a = [];
    for (let i = 0; i < values.length; i += 1) {
      if (
        values[i] !== '' &&
        values[i] !== '' &&
        values[i] !== null &&
        values[i] !== false &&
        values[i] !== '0'
      ) {
        const d = { [`${keys[i]}`]: values[i] };
        a.push(d);
      }
    }

    a.map((el, index) => {
      // console.log(el);

      const keysData = Object.keys(el);
      const valuesData = Object.values(el);
      if (
        keysData[0] !== 'brand' &&
        keysData[0] !== 'catalog' &&
        keysData[0] !== 'ssd' &&
        keysData[0] !== 'name'
      ) {
        listRef.insertAdjacentHTML(
          'beforeend',
          `<tbody><tr data-table__data><td>${keysData}</td><td>${valuesData}</td></tr></tbody>`
        );
      }
    });

    getPostTree(ssdCar, vehicleidCar, catalogCar);
  } else {
    alert('Ого, паря, тебе поймали, вычислили твой IP(загуглишь потом)');
  }
}

function onClickTree(event) {
  if (event.target.classList.contains('none')) {
    const targetID = event.target.parentNode.dataset.id;
    // alert(
    //   ssdCar + vehicleidCar + catalogCar + event.target.parentNode.dataset.id
    // );
    // console.log(event.target.parentNode.dataset.id);
    postShowLinks(catalogCar, ssdCar, vehicleidCar, targetID);
  }

  if (event.target.nodeName !== 'SPAN') {
    return;
  }

  let childrenContainer = event.target.parentNode.querySelector('ul');

  // ** Если нет вложеных детей

  if (!childrenContainer) {
    return;
  }

  childrenContainer.hidden = !childrenContainer.hidden;

  if (childrenContainer.hidden) {
    event.target.classList.add('hide');
    event.target.classList.remove('show');
  } else {
    event.target.classList.add('show');
    event.target.classList.remove('hide');
  }
}

function postShowLinks(code, ssd, carid, group) {
  const request = new XMLHttpRequest();
  request.open('POST', 'https://autodoka-srv.com/Meric/hs/tecdoc/schem/');
  request.responseType = 'json';

  let bodyS = {
    code,
    ssd,
    carid,
    group,
  };

  const body = JSON.stringify(bodyS);

  request.setRequestHeader('Content-Type', 'application/json');

  request.setRequestHeader('Token', 'sAnWaCmRqtrdEySnoXA6l5tFpP7qmETl');

  request.onload = function () {
    // console.log(request.response.data);

    onOpenImage(request.response.data);
  };

  request.send(body);
}

function onOpenImage(data) {
  const dataSet = data;
  console.log(dataSet);

  dataSet.map((el, index) => {
    const imageUrl = el.imageurl;
    const codeImage = el.code;
    const name = el.name;
    const detailsMatch = el.detailsMatch;

    schemesBox.insertAdjacentHTML(
      'beforeend',

      ` <div class="trumb-for-scheme">
    <p class="table-text">${codeImage} ${name}</p>
    <div class="window__scheme">
      <button type="button" class="window__scheme--button">
        <img src="${imageUrl}" alt="" width="320" />
      </button>
      <table align="center" class="table" rules="all">
        <thead class="thead">
          <tr>
            <th class="table__title">№ Детали</th>
            <th class="table__title">OEM</th>
            <th class="table__title">Наименование детали</th>
          </tr>
        </thead>
        <tbody  class="insert_html">
          
        </tbody>
      </table>
    </div>
  </div>`
    );

    console.log(detailsMatch);
    detailsMatch.map((detail) => {
      const codeOnImage = detail.codeonimage;
      const detailName = detail.detailname;
      const oem = detail.oem;

      const tableData = schemesBox.querySelectorAll('.insert_html')[index];

      tableData.insertAdjacentHTML(
        'beforeend',
        ` <tr>
        <td>
          <div class="table__data"><a href="">${codeOnImage}</a></div>
        </td>
        <td>
          <div class="table__data"><a href="">${oem}</a></div>
        </td>
        <td>
          <div class="table__data"><a href="">${detailName}</a></div>
        </td>
      </tr> `
      );
    });
  });
}

const listRef = document.querySelector('.js-card-table');
const searchRef = document.querySelector('.search-form ');
const titleTableRef = document.querySelector('[data-title]');
const dataTableRef = document.querySelector('[data-table__data]');
const treeRef = document.querySelector('.tree');
const schemesBox = document.querySelector('.js-schemes');

searchRef.addEventListener('submit', onSearch);
treeRef.addEventListener('click', onClickTree);
