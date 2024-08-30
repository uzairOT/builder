/**
 * @param {string} permissionSlug -
 * @param {Array} permissionsState 
 * @returns {boolean} 
 */
export const useProjectPermissionCheck = (permissionSlug, permissionsState) => {
  if (!Array.isArray(permissionsState)) {
    console.error('permissionsState should be an array');
    return false;
  }

  const hasAccess = permissionsState.some(permission =>
    permission.permission?.slug === permissionSlug && permission.hasAccess
  );

  return hasAccess;
};
