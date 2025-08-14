import { useMemo, useReducer, type ReactNode } from "react";
import { activityReducer, initialState } from "../reducers/activity-reducer";
import { ActivityContext } from "./ActivityContext";
import type { Activity } from "../types";
import { categories } from "../data/categories";

type ActivityProviderProps = {
  children: ReactNode;
};

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  // Contadores de CalorieTracker
  const caloriesConsumed = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );

  const caloriesBurned = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [caloriesConsumed, caloriesBurned]
  );

  // Funciones de ActivityList
  const categoryName = (category: Activity["category"]) =>
    categories.find((cat) => cat.id === category)?.name ?? "";

  const isEmptyActivities = useMemo(
    () => state.activities.length === 0,
    [state.activities]
  );

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        caloriesConsumed,
        caloriesBurned,
        netCalories,
        categoryName,
        isEmptyActivities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
