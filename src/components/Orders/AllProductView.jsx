// const createNewDataset = () => {
// 	let itemList = [];
// 	orderItems.forEach((item) => {
// 		const tempItem = itemList.some((itemList) => itemList.naam === item.naam);
// 		if (tempItem) {
// 			itemList.map((productObject, index) => {
// 				if (productObject.naam !== item.naam) return;
// 				if (!productObject.prijs.perStuk) {
// 					const temporaryObject = productObject.gewicht;
// 					const tempValue = temporaryObject.some(
// 						(temporaryObject) =>
// 							temporaryObject.hoeveelheid === item.gewicht.hoeveelheid,
// 					);
// 					if (tempValue) {
// 						temporaryObject.map((temporaryItem, i) => {
// 							if (temporaryItem.hoeveelheid !== item.gewicht.hoeveelheid)
// 								return;
// 							let newAmount = temporaryItem.delen + item.gewicht.delen;

// 							itemList[index].gewicht[i] = {
// 								...itemList[index].gewicht[i],
// 								delen: newAmount,
// 							};
// 						});
// 					} else {
// 						itemList[index].gewicht.push(item.gewicht);
// 					}
// 				} else {
// 					const temporaryObject = productObject.gewicht;
// 					const tempValue = temporaryObject.some(
// 						(temporaryObject) => temporaryObject.stuks === item.stuks,
// 					);
// 					if (tempValue) {
// 						temporaryObject.map((temporaryItem, i) => {
// 							if (temporaryItem.stuks !== item.stuks) return;
// 							let newAmount = (temporaryItem.aantal += 1);
// 							itemList[index].gewicht[i] = {
// 								...itemList[index].gewicht[i],
// 								aantal: newAmount,
// 							};
// 						});
// 					} else {
// 						let newObject = {
// 							stuks: item.stuks,
// 							aantal: 1,
// 						};
// 						itemList[index].gewicht.push(newObject);
// 					}
// 				}
// 			});
// 		} else {
// 			let tempObject = {};
// 			if (item.stukPrijs === "gewicht") {
// 				tempObject = {
// 					naam: item.naam,
// 					stukPrijs: item.stukPrijs,
// 					gewicht: [
// 						{
// 							hoeveelheid: item.gewicht.hoeveelheid,
// 							delen: item.gewicht.delen,
// 						},
// 					],
// 				};
// 			} else {
// 				tempObject = {
// 					naam: item.naam,
// 					stukPrijs: item.stukPrijs,
// 					gewicht: [
// 						{
// 							stuks: item.stuks,
// 							aantal: 1,
// 						},
// 					],
// 				};
// 			}
// 			itemList.push(tempObject);
// 		}
// 	});
// 	return itemList;
// };
