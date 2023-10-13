using GhostUI.Models;
using JwtWork.PISDB.Models;
using System;

namespace GhostUI.Mappers
{
    public class JobMap:BaseDto<JobMap,PSJob>
    {
        public string JobName { get; set; }

        public string JobStructure { get; set; }

        public int CompleteYear { get; set; }

        /// <summary>
        /// Add the custom mappings for the DTO.
        /// The AddMapster in Program.cs will look for this in order to add the mappings.
        /// </summary>
        public override void AddCustomMappings()
        {
            // Mapster can map properties with different names
            // Here we split the price into two properties for the model behind the DTO
            // DTO to model
            SetCustomMappings()
                .Map(dest => dest.CompleteYear,
                     src => src.CompleteYear)
                .Map(dest => dest.JobTitle,
                     src => src.JobName)
                .Map(dest=> dest.StructureNo,
                src=> src.JobStructure);

            // Mapping from model to DTO
            SetCustomMappingsReverse()
                .Map(dest => dest.JobName, src => src.JobTitle)
                .Map(dest => dest.JobStructure, src => src.StructureNo)
                .Map(dest => dest.CompleteYear, src => src.CompleteYear ?? 2999);
        }
    }
}
