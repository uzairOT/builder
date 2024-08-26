import { useSelector } from 'react-redux';

/**
 * Custom hook to check if a specific role has access to a given permission based on slug,
 * and verify if the project is owned by the superAdminId.
 * 
 * @param {string} permissionSlug - The slug of the permission to check.
 * @param {string} role - The role to check for access.
 * @param {number} superAdminId - The ID of the project's owner (super admin).
 * 
 * @returns {boolean} - Returns true if the role has access to the permission and the user is the owner, otherwise false.
 */
export const useProjectPermissionCheck = (permissionSlug, role, superAdminId) => {

  const permissionsState = useSelector((state) => state.ProjectPermissionList.permission);
  if (role==="superadmin"){
    return true;
}
  const hasAccess = permissionsState.some(org => 
    org.owner.userId === superAdminId &&
    org.permissions.some(permission =>
      permission.permission.slug === permissionSlug &&
      permission.roles[role] === true
    )
  );

  return hasAccess;
};
