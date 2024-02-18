package sbom

import (
	"context"

	"github.com/goharbor/harbor/src/controller/artifact/processor"
	"github.com/goharbor/harbor/src/controller/artifact/processor/base"
	"github.com/goharbor/harbor/src/lib/errors"
	"github.com/goharbor/harbor/src/lib/log"
	"github.com/goharbor/harbor/src/pkg/artifact"
)

const (
	ArtifactTypeSBOM = "sbom"
	mediaType        = "application/vnd.goharbor.harbor.sbom.v1"
)

func init() {
	pc := &Processor{}
	if err := processor.Register(pc, mediaType); err != nil {
		log.Errorf("failed to register processor for media type %s: %v", mediaType, err)
		return
	}
}

type Processor struct {
	*base.ManifestProcessor
}

func (m *Processor) AbstractAddition(ctx context.Context, art *artifact.Artifact, addition string) (*processor.Addition, error) {
	return nil, errors.New(nil).WithCode(errors.BadRequestCode).
		WithMessage("debug: addition %s isn't supported for %s", addition, ArtifactTypeSBOM)
}
