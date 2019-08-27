import { fetchMales } from "./api";

export const loadMales = (
  offset,
  arrayMales,
  cursor,
  modelId,
  dispatchFn,
  finishBmFn,
  filters,
  type
) => {
  fetchMales(
    filters,
    offset,
    data => {
      let cursor = data.cursor;
      data = data.profiles;

      if (!data.length) {
        finishBmFn({ bmLoaded: true });
      }

      for (let idx = 0; idx < data.length; idx++) {
        if (idx === data.length - 1) {
          offset += data.length;
          loadMales(
            offset,
            arrayMales,
            cursor,
            modelId,
            dispatchFn,
            finishBmFn,
            filters,
            type
          );
        }

        arrayMales.push(data[idx].id);
      }
    },
    cursor
  );

  arrayMales = arrayMales.filter(x => x !== modelId);
  arrayMales = [...new Set(arrayMales)];

  dispatchFn({ type: type, payload: arrayMales });
};
