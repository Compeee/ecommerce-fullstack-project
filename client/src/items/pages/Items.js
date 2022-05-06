import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemsList from "../components/ItemsList";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";

const Items = () => {
  const [isLoading, setIsLoading] = useState();
  const [itemData, setItemData] = useState();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const items = await axios.get(
          process.env.REACT_APP_BACKEND + "/items/"
        );
        setIsLoading(false);
        setItemData(items.data);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []); //We can add it as dependency because useCallback will prevent a loop

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && itemData && <ItemsList items={itemData.items} />}
    </React.Fragment>
  );
};

export default Items;
