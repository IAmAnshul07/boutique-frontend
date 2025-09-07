"use client";
import React, { useState, useEffect } from "react";
import { useGetCategoriesQuery } from "@/redux/services/category";
import { useGetColorsQuery } from "@/redux/services/color";
import useSearchFilterParam from "@/hooks/useSearchFilterParam";
import { useGetTagsQuery } from "@/redux/services/tag";
import { useSessionLens } from "@/hooks/useSessionLens";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Color {
  id: number;
  name: string;
  hex: string;
}

const Filter = () => {
  const [showFilters, setShowFilters] = useState(false);
  const categoryFilter = ["Women", "Men", "Kids"];
  const price = ["Rs. 59 to Rs. 500", "Rs. 500 to Rs. 1000", "Rs. 1000 to Rs. 2000", "Rs. 2000 to Rs. 5000"];
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: colorsData } = useGetColorsQuery();
  const { data: occasionData } = useGetTagsQuery();
  const { getParamValues, handleItemChange, clearAllParams } = useSearchFilterParam();
  const { trackEvent } = useSessionLens();
  const { user } = useSelector((state: RootState) => state.userReducer);

  // Helper functions
  const getAllFilters = () => {
    return {
      types: getParamValues("types"),
      categories: getParamValues("categories"),
      occasions: getParamValues("occasions"),
      prices: getParamValues("prices"),
      colors: getParamValues("colors")
    };
  };

  const getFilteredResultsCount = () => {
    // Implement based on your product filtering logic
    return 0;
  };

  const toggleFilters = () => {
    trackEvent("click", {
      target_id: "filter_toggle",
      label: showFilters ? "Hide Filters" : "Show Filters",
      location: "filter_section",
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      is_logged_in: !!user,
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      session_duration: Date.now() - (window as any).sessionStartTime || 0,
      timestamp: new Date().toISOString(),
      event_summary: `User ${showFilters ? "hid" : "showed"} filters on ${/Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop"}`
    });
    
    // Track filter panel view when opened
    if (!showFilters) {
      trackEvent("modal_open", {
        modal_id: "filter_panel",
        source: "product_listing",
        user_id: user?.id || "anonymous",
        user_role: user?.role || "guest",
        is_logged_in: !!user,
        modal_type: "filter_panel",
        device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
        session_duration: Date.now() - (window as any).sessionStartTime || 0,
        timestamp: new Date().toISOString(),
        event_summary: `User opened filter panel on ${/Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop"}`
      });
    } else {
      trackEvent("modal_close", {
        modal_id: "filter_panel",
        source: "product_listing",
        user_id: user?.id || "anonymous",
        user_role: user?.role || "guest",
        is_logged_in: !!user,
        modal_type: "filter_panel",
        device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
        session_duration: Date.now() - (window as any).sessionStartTime || 0,
        timestamp: new Date().toISOString(),
        event_summary: `User closed filter panel on ${/Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop"}`
      });
    }
    
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    const currentFilters = getParamValues(filterType);
    const isAdding = !currentFilters.includes(value);
    
    // Track section interaction
    trackEvent("section_switch", {
      section_name: filterType.toUpperCase(),
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      is_logged_in: !!user,
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      session_duration: Date.now() - (window as any).sessionStartTime || 0,
      timestamp: new Date().toISOString(),
      event_summary: `User interacted with ${filterType.toUpperCase()} filter section`
    });
    
    trackEvent("filter_applied", {
      filter_type: filterType,
      filter_value: value,
      filter_section: filterType.toUpperCase(),
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      is_logged_in: !!user,
      filter_action: isAdding ? "add" : "remove",
      total_filters_applied: Object.keys(getAllFilters()).length,
      filter_combination: JSON.stringify(getAllFilters()),
      results_count: getFilteredResultsCount(),
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      session_duration: Date.now() - (window as any).sessionStartTime || 0,
      filters_used_in_session: (window as any).filtersUsedInSession || 1,
      timestamp: new Date().toISOString(),
      event_summary: `User ${isAdding ? "added" : "removed"} ${filterType} filter: ${value} (${getFilteredResultsCount()} results)`
    });
    
    handleItemChange(filterType, value);
    
    // Increment filter usage counter
    (window as any).filtersUsedInSession = ((window as any).filtersUsedInSession || 0) + 1;
  };

  const handleSectionClick = (sectionName: string) => {
    trackEvent("click", {
      target_id: `filter_section_${sectionName.toLowerCase()}`,
      label: sectionName,
      location: "filter_panel",
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      is_logged_in: !!user,
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      session_duration: Date.now() - (window as any).sessionStartTime || 0,
      timestamp: new Date().toISOString(),
      event_summary: `User clicked on ${sectionName} filter section`
    });
  };

  const handleFilterSectionExpand = (sectionName: string) => {
    trackEvent("section_switch", {
      section_name: sectionName,
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      is_logged_in: !!user,
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      session_duration: Date.now() - (window as any).sessionStartTime || 0,
      timestamp: new Date().toISOString(),
      event_summary: `User expanded ${sectionName} filter section`
    });
  };

  const handleClearFilters = () => {
    const totalFilters = Object.keys(getAllFilters()).length;
    
    trackEvent("click", {
      target_id: "clear_filters",
      label: "Clear All Filters",
      location: "filter_section",
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      is_logged_in: !!user,
      total_filters_cleared: totalFilters,
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      session_duration: Date.now() - (window as any).sessionStartTime || 0,
      timestamp: new Date().toISOString(),
      event_summary: `User cleared ${totalFilters} applied filters`
    });
    
    clearAllParams();
  };

  useEffect(() => {
    // Manage scroll on the body when the modal is open
    document.body.style.overflow = showFilters ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto"; // Reset overflow on component unmount
    };
  }, [showFilters]);

  return (
    <div className="relative flex flex-col md:border-r-2 !mr-0 md:border-[#e8e9ea] mx-4 sm:mx-8 mt-5">
      {/* Mobile view filter button */}
      <div className="md:hidden fixed bottom-0 left-0 w-screen bg-white shadow-md p-2 z-[150]">
        <button className="btn btn-primary w-full" onClick={toggleFilters}>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filter content */}
      <div
        className={`fixed inset-0 z-50 bg-white overflow-y-auto p-4 md:static md:overflow-visible md:p-0 ${showFilters ? "block" : "hidden md:block"}`}
        style={{ height: showFilters ? "calc(100vh - 3.5rem)" : "auto" }}
      >
        <div className="flex flex-col h-full p-4 md:p-0">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-md">FILTERS</h1>
            <button className="btn btn-xs mx-2" onClick={handleClearFilters}>
              Clear Filter
            </button>
            <button className="btn btn-xs md:hidden" onClick={toggleFilters}>
              Close
            </button>
          </div>
          <div className="divider"></div>
          <h1 className="text-md cursor-pointer" onClick={() => handleSectionClick("TYPE")}>TYPE</h1>
          {categoryFilter.map((category, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={category}
                className="checkbox checkbox-sm"
                checked={getParamValues("types").includes(category)}
                onChange={() => handleFilterChange("types", category)}
              />
              <span>{category}</span>
            </label>
          ))}
          <div className="divider my-4"></div> {/* Added margin for spacing */}
          <h1 className="text-md cursor-pointer" onClick={() => handleSectionClick("CATEGORIES")}>CATEGORIES</h1>
          {categoriesData?.data?.map((category: { id: string; name: string }) => (
            <label key={category.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={category.name}
                className="checkbox checkbox-sm"
                checked={getParamValues("categories").includes(category.name)}
                onChange={() => handleFilterChange("categories", category.name)}
              />
              <span>{category.name}</span>
            </label>
          ))}
          <div className="divider my-4"></div> {/* Added margin for spacing */}
          <h1 className="text-md cursor-pointer" onClick={() => handleSectionClick("OCCASIONS")}>OCCASIONS</h1>
          {occasionData?.data?.map((occasion: { id: string; name: string }) => (
            <label key={occasion.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={occasion.name}
                className="checkbox checkbox-sm"
                checked={getParamValues("occasions").includes(occasion.name)}
                onChange={() => handleFilterChange("occasions", occasion.name)}
              />
              <span>{occasion.name}</span>
            </label>
          ))}
          <div className="divider my-4"></div> {/* Added margin for spacing */}
          <h1 className="text-md cursor-pointer" onClick={() => handleSectionClick("PRICE")}>PRICE</h1>
          {price.map((amount, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={amount}
                className="checkbox checkbox-sm"
                checked={getParamValues("prices").includes(amount)}
                onChange={() => handleFilterChange("prices", amount)}
              />
              <span>{amount}</span>
            </label>
          ))}
          <div className="divider my-4"></div> {/* Added margin for spacing */}
          <h1 className="text-md cursor-pointer" onClick={() => handleSectionClick("COLOR")}>COLOR</h1>
          {colorsData &&
            colorsData?.result?.map((color: Color) => (
              <label key={color.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={color.name}
                  className="checkbox checkbox-sm"
                  checked={getParamValues("colors").includes(color.name)}
                  onChange={() => handleFilterChange("colors", color.name)}
                />
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: color.hex }}></span>
                <span>{color.name}</span>
              </label>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
