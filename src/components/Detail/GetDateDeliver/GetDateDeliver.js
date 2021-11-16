const getDate = () => {
  const currentDate = new Date();
  const firstDate = currentDate.getDate() - currentDate.getDay();
  const lastDate = firstDate + 4;
  return {
    getFirstDate: new Date(currentDate.setDate(firstDate)).toLocaleDateString('vi-vn'),
    getLastDate: new Date(currentDate.setDate(lastDate)).toLocaleDateString('vi-vn'),
  };
};

export default getDate;
