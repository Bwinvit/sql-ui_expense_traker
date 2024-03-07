import { CollectionConfig } from "payload/types";
import { isAdmin, isAuthenticated } from "../utils/Access";

const BaseCategory: CollectionConfig = {
    slug: "baseCategory",
    admin: {
        useAsTitle: "title",
    },
    fields: [
        {
            name: "title",
            type: "text",
            label: "Title",
            required: true,
        },
        {
            name: "transactionType",
            type: "select",
            label: "Transaction Type",
            options: [
                { label: "Income", value: "income" },
                { label: "Outcome", value: "outcome" },
                { label: "Investment", value: "investment" },
                { label: "Saving", value: "saving" },
                { label: "Health Care", value: "healthcare" },
            ],
            required: true,
        },
        {
            name: "createdBy",
            type: "relationship",
            relationTo: "users",
            access: {
                update: () => false,
            },
            admin: {
                readOnly: true,
                position: "sidebar",
                condition: (data) => Boolean(data?.createdBy),
            },
        },
    ],
    access: {
        read: isAuthenticated,
        update: isAdmin,
        delete: isAdmin,
    },
    hooks: {
        beforeChange: [
          ({ req, operation, data }) => {
            if (operation === 'create') {
              if (req.user) {
                data.createdBy = req.user.id;
                return data;
              }
            }
          },
        ],
      },
};

export default BaseCategory;
