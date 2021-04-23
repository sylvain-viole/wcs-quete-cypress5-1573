# wcs-quete-cypress5-1573
This repo hosts cypress Tests report training on mavillemonshopping.com

---

### Reporter use :
- mochawesome
- mochawesome merge
- cypress-mochawesome-reporter

+

- Context option to include screenshots to report :
```Cypress.on("test:after:run", (test, runnable) => {
    const imageUrl = `./screenshots/${Cypress.spec.name}/${runnable.title.substr(0,7)}.png`;

    addContext({ test }, imageUrl);
});
```

### How To :

```
git clone https://github.com/sylvain-viole/wcs-quete-cypress5-1573.git
cd wcs-quete-cypress5-1573
npm install
npm run cy:run
```

### Screenshot of result
![Capture d’écran 2021-04-23 à 06 19 58](https://user-images.githubusercontent.com/71819292/115818148-73834180-a3fc-11eb-9fc7-3066219482af.png)


CHEERS !



