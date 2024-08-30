import { useSelector } from 'react-redux';
import { useEffect } from 'react';

/**
 * @param {string} permissionSlug - The slug of the permission to check.
 * @param {[]} permissionsState - The slug of the permission to check.
 * @returns {boolean} - Returns true if the permission with the given slug has access, otherwise false.
 */
export const useProjectPermissionCheck = (permissionSlug, permissionsState) => {

  const hasAccess = permissionsState?.some(permission =>
    permission.permission.slug === permissionSlug && permission.hasAccess
  );

  return hasAccess;
};
