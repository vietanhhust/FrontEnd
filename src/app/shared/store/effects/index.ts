import { MenuEffects } from '../../components/header/store/header.effects';
import { UserEditEffect } from 'src/app/system/users/user-store/user.effects'
import { RolesEffect } from 'src/app/system/roles/role-store/role.effects';

export const effects: any[] = [MenuEffects, UserEditEffect, RolesEffect];
