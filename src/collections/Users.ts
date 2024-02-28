import { CollectionConfig } from 'payload/types';
import { RowLabel } from 'payload/types';

const Users: CollectionConfig = {
    slug: "users",
    auth: true,
    admin: {
        useAsTitle: "email",
    },
    fields: [
        {
            name: "displayName",
            type: "text",
            label: "Display Name",
            required: true,
            unique: true,
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            required: true,
            unique: true,
        },
        {
            name: "role",
            label: "Role",
            type: "select",
            options: [
                { label: "Admin", value: "admin" },
                { label: "Super Admin", value: "super_admin" },
            ],
            required: true,
        },
    ],
};

export default Users;