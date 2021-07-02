from django.db.models.query import QuerySet


class CommonFilterBusinessMixin:
    def filter_queryset(self, queryset: QuerySet):
        keyword = self.request.query_params.get("keyword")
        business = self.request.query_params.get('business')
        if keyword is not None or keyword == '':
            queryset = queryset.filter(name__icontains=keyword)
        if business is not None:

            queryset = queryset.filter(business=business)

        return super().filter_queryset(queryset)
