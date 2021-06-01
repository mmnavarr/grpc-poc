gen_golang:
	protoc --go_out=golang/ \
		--go_opt=paths=source_relative \
		--go-grpc_out=golang/ \
		--go-grpc_opt=paths=source_relative \
		proto/*.proto

gen_ts:
	yarn run grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:ts/ \
    --grpc_out=ts/ \
    --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
    -I ./proto \
    proto/*.proto

	yarn run grpc_tools_node_protoc \
		--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
		--ts_out=ts/ \
		-I ./proto \
		proto/*.proto
