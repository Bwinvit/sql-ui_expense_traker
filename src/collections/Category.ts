import { CollectionConfig } from "payload/types";
import { isAdminOrCreatedBy } from "../utils/Access";

const Category: CollectionConfig = {
    slug: "category",
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
        read: isAdminOrCreatedBy,
        update: isAdminOrCreatedBy,
        delete: isAdminOrCreatedBy,
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

export default Category;
