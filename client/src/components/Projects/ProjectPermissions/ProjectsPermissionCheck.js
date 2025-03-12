/**
 * @param {string} permissionSlug -
 * @param {Array} permissionsState
 * @param {string} currentRoute
 * @returns {boolean}
 */
export const useProjectPermissionCheck = (permissionSlug, permissionsState, currentRoute) => {
 
 
  if (currentRoute ==="/assignproject") {
    return true;
  }
 
  if (!Array.isArray(permissionsState)) {
    return false;
  }

  const hasAccess = permissionsState.some(
    (permission) =>
      permission.permission?.slug === permissionSlug && permission.hasAccess
  );

  return hasAccess;
};

